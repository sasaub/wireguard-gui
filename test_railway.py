#!/usr/bin/env python3
"""
Test script for Railway deployment
"""

import os
import sys

def test_railway_config():
    """Test Railway configuration"""
    print("Testing Railway configuration...")
    
    # Test environment variables
    railway_env = os.environ.get('RAILWAY_ENVIRONMENT')
    port = os.environ.get('PORT')
    
    print(f"RAILWAY_ENVIRONMENT: {railway_env}")
    print(f"PORT: {port}")
    
    # Test database URL
    db_url = os.environ.get('DATABASE_URL', 'sqlite:///wireguard.db')
    print(f"DATABASE_URL: {db_url}")
    
    # Test MikroTik config
    mikrotik_host = os.environ.get('MIKROTIK_HOST', '192.168.1.1')
    print(f"MIKROTIK_HOST: {mikrotik_host}")
    
    print("Railway configuration test completed!")

if __name__ == "__main__":
    test_railway_config() 