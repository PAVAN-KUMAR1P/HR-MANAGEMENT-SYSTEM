import requests
import json

# Test data with correct schema
data = {
    "teams": [
        {
            "total_workers": 30,
            "cutting_workers": 10,
            "sewing_workers": 15,
            "finishing_workers": 5,
            "cutting_attendance": 9,
            "sewing_attendance": 14,
            "finishing_attendance": 4,
            "daily_target": 800
        },
        {
            "total_workers": 25,
            "cutting_workers": 8,
            "sewing_workers": 12,
            "finishing_workers": 5,
            "cutting_attendance": 7,
            "sewing_attendance": 11,
            "finishing_attendance": 5,
            "daily_target": 600
        }
    ]
}

try:
    # Test health endpoint
    print("Testing health endpoint...")
    health_resp = requests.get("http://127.0.0.1:8000/health")
    print(f"Health Status: {health_resp.status_code}")
    print(f"Health Response: {health_resp.json()}\n")
    
    # Test optimization endpoint
    print("Testing ML model with optimization endpoint...")
    opt_resp = requests.post("http://127.0.0.1:8000/optimize", json=data)
    print(f"Optimize Status: {opt_resp.status_code}")
    print(f"Optimize Response: {json.dumps(opt_resp.json(), indent=2)}")
    
except Exception as e:
    print(f"Error: {e}")
