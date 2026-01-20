#!/usr/bin/env python3
"""
Portfolio Backend API Testing Suite
Tests all backend endpoints for the portfolio application
"""

import requests
import json
import sys
from datetime import datetime
import time

# Get backend URL from frontend .env
BACKEND_URL = "https://future-ai-profile.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.test_results = []
        self.session = requests.Session()
        
    def log_test(self, test_name, success, details=""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        self.test_results.append({
            'test': test_name,
            'success': success,
            'details': details,
            'timestamp': datetime.now().isoformat()
        })
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        print()

    def test_health_check(self):
        """Test GET /api/ health check endpoint"""
        print("🔍 Testing Health Check Endpoint...")
        try:
            response = self.session.get(f"{self.base_url}/")
            
            if response.status_code == 200:
                data = response.json()
                expected_message = "Portfolio API is running"
                expected_status = "healthy"
                
                if (data.get("message") == expected_message and 
                    data.get("status") == expected_status):
                    self.log_test("Health Check", True, f"Response: {data}")
                    return True
                else:
                    self.log_test("Health Check", False, 
                                f"Unexpected response format. Got: {data}")
                    return False
            else:
                self.log_test("Health Check", False, 
                            f"Status code: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
            return False

    def test_contact_form_valid_submission(self):
        """Test POST /api/contact with valid data"""
        print("🔍 Testing Valid Contact Form Submission...")
        
        test_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "message": "This is a test message for the portfolio contact form. It contains enough characters to pass validation."
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contact",
                json=test_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 201:
                data = response.json()
                
                # Check response structure
                if (data.get("success") is True and 
                    "message" in data and 
                    "id" in data):
                    self.log_test("Valid Contact Submission", True, 
                                f"Message ID: {data.get('id')}")
                    return True, data.get('id')
                else:
                    self.log_test("Valid Contact Submission", False, 
                                f"Invalid response structure: {data}")
                    return False, None
            else:
                self.log_test("Valid Contact Submission", False, 
                            f"Status code: {response.status_code}, Response: {response.text}")
                return False, None
                
        except Exception as e:
            self.log_test("Valid Contact Submission", False, f"Exception: {str(e)}")
            return False, None

    def test_contact_form_validation_errors(self):
        """Test POST /api/contact validation errors"""
        print("🔍 Testing Contact Form Validation...")
        
        validation_tests = [
            {
                "name": "Missing Name Field",
                "data": {
                    "email": "test@example.com",
                    "message": "This is a test message with enough characters."
                },
                "expected_error": "name"
            },
            {
                "name": "Invalid Email Format",
                "data": {
                    "name": "Test User",
                    "email": "test@invalid",
                    "message": "This is a test message with enough characters."
                },
                "expected_error": "email"
            },
            {
                "name": "Message Too Short",
                "data": {
                    "name": "Test User",
                    "email": "test@example.com",
                    "message": "Short"
                },
                "expected_error": "message"
            },
            {
                "name": "Name Too Short",
                "data": {
                    "name": "A",
                    "email": "test@example.com",
                    "message": "This is a test message with enough characters."
                },
                "expected_error": "name"
            }
        ]
        
        all_passed = True
        
        for test in validation_tests:
            try:
                response = self.session.post(
                    f"{self.base_url}/contact",
                    json=test["data"],
                    headers={"Content-Type": "application/json"}
                )
                
                if response.status_code == 422:
                    error_data = response.json()
                    self.log_test(f"Validation - {test['name']}", True, 
                                f"Correctly rejected with 422: {error_data}")
                else:
                    self.log_test(f"Validation - {test['name']}", False, 
                                f"Expected 422, got {response.status_code}: {response.text}")
                    all_passed = False
                    
            except Exception as e:
                self.log_test(f"Validation - {test['name']}", False, f"Exception: {str(e)}")
                all_passed = False
        
        return all_passed

    def test_get_contact_messages(self):
        """Test GET /api/contact/messages admin endpoint"""
        print("🔍 Testing Get Contact Messages Endpoint...")
        
        try:
            response = self.session.get(f"{self.base_url}/contact/messages")
            
            if response.status_code == 200:
                data = response.json()
                
                # Should return a list
                if isinstance(data, list):
                    # Check if messages have required fields
                    if len(data) > 0:
                        message = data[0]
                        required_fields = ['id', 'name', 'email', 'message', 'created_at', 'read']
                        
                        if all(field in message for field in required_fields):
                            self.log_test("Get Contact Messages", True, 
                                        f"Retrieved {len(data)} messages with correct structure")
                            return True
                        else:
                            missing_fields = [f for f in required_fields if f not in message]
                            self.log_test("Get Contact Messages", False, 
                                        f"Missing fields in message: {missing_fields}")
                            return False
                    else:
                        self.log_test("Get Contact Messages", True, 
                                    "Retrieved empty message list (no messages yet)")
                        return True
                else:
                    self.log_test("Get Contact Messages", False, 
                                f"Expected list, got: {type(data)}")
                    return False
            else:
                self.log_test("Get Contact Messages", False, 
                            f"Status code: {response.status_code}, Response: {response.text}")
                return False
                
        except Exception as e:
            self.log_test("Get Contact Messages", False, f"Exception: {str(e)}")
            return False

    def test_data_persistence(self, message_id=None):
        """Test that submitted data persists in MongoDB"""
        print("🔍 Testing Data Persistence...")
        
        if not message_id:
            print("   Skipping persistence test - no message ID from previous test")
            return False
            
        try:
            # Wait a moment for data to be saved
            time.sleep(1)
            
            # Retrieve messages and check if our test message exists
            response = self.session.get(f"{self.base_url}/contact/messages")
            
            if response.status_code == 200:
                messages = response.json()
                
                # Look for our test message
                found_message = None
                for msg in messages:
                    if msg.get('id') == message_id:
                        found_message = msg
                        break
                
                if found_message:
                    self.log_test("Data Persistence", True, 
                                f"Message persisted correctly: {found_message['name']} - {found_message['email']}")
                    return True
                else:
                    self.log_test("Data Persistence", False, 
                                f"Message with ID {message_id} not found in database")
                    return False
            else:
                self.log_test("Data Persistence", False, 
                            f"Could not retrieve messages to verify persistence: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Data Persistence", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("🚀 PORTFOLIO BACKEND API TESTING SUITE")
        print("=" * 60)
        print(f"Testing Backend URL: {self.base_url}")
        print()
        
        # Test 1: Health Check
        health_ok = self.test_health_check()
        
        # Test 2: Valid Contact Submission
        contact_ok, message_id = self.test_contact_form_valid_submission()
        
        # Test 3: Validation Errors
        validation_ok = self.test_contact_form_validation_errors()
        
        # Test 4: Get Messages
        messages_ok = self.test_get_contact_messages()
        
        # Test 5: Data Persistence
        persistence_ok = self.test_data_persistence(message_id)
        
        # Summary
        print("=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result['success'])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        print()
        
        if failed_tests > 0:
            print("❌ FAILED TESTS:")
            for result in self.test_results:
                if not result['success']:
                    print(f"   - {result['test']}: {result['details']}")
            print()
        
        overall_success = failed_tests == 0
        status = "✅ ALL TESTS PASSED" if overall_success else "❌ SOME TESTS FAILED"
        print(f"Overall Status: {status}")
        print("=" * 60)
        
        return overall_success, self.test_results


if __name__ == "__main__":
    tester = PortfolioAPITester()
    success, results = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)