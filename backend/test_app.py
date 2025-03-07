import pytest
from fastapi.testclient import TestClient
from app import app
import uuid
from datetime import date

client = TestClient(app)

def create_test_note():
    """Helper function to create a test note and return its ID"""
    response = client.post(
        "/create", 
        json={"content": "Test day note", "rating": 4}
    )
    
    assert response.status_code == 200
    data = response.json()
    return data["id"]

def test_create_day_note():
    response = client.post(
        "/create", 
        json={"content": "Test day note", "rating": 4}
    )
    
    assert response.status_code == 200
    data = response.json()
    
    assert "id" in data
    assert data["content"] == "Test day note"
    assert data["rating"] == 4
    assert "date" in data

def test_get_all_day_notes():
    # Create a note first
    note_id = create_test_note()
    
    # Test get all notes
    response = client.get("/alldays")
    
    assert response.status_code == 200
    data = response.json()
    
    assert isinstance(data, list)
    assert len(data) >= 1
    
    # Check if our note is in the list
    note_found = False
    for note in data:
        if note["id"] == note_id:
            note_found = True
            assert note["content"] == "Test day note"
            assert note["rating"] == 4
    
    assert note_found

def test_update_day_note():
    # Create a note first
    note_id = create_test_note()
    
    # Test update note
    response = client.put(
        f"/update/{note_id}", 
        json={"content": "Updated content", "rating": 5}
    )
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["id"] == note_id
    assert data["content"] == "Updated content"
    assert data["rating"] == 5

def test_update_day_note_partial():
    # Create a note first
    note_id = create_test_note()
    
    # Test update only content
    response = client.put(
        f"/update/{note_id}", 
        json={"content": "Only content updated"}
    )
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["id"] == note_id
    assert data["content"] == "Only content updated"
    assert data["rating"] == 4  # Unchanged
    
    # Test update only rating
    response = client.put(
        f"/update/{note_id}", 
        json={"rating": 2}
    )
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["id"] == note_id
    assert data["content"] == "Only content updated"  # Unchanged
    assert data["rating"] == 2

def test_update_invalid_rating():
    # Create a note first
    note_id = create_test_note()
    
    # Test update with invalid rating
    response = client.put(
        f"/update/{note_id}", 
        json={"rating": 6}
    )
    
    assert response.status_code == 422  # Validation error
    
    # Test update with another invalid rating
    response = client.put(
        f"/update/{note_id}", 
        json={"rating": 0}
    )
    
    assert response.status_code == 422  # Validation error

def test_update_nonexistent_note():
    fake_id = str(uuid.uuid4())
    
    response = client.put(
        f"/update/{fake_id}", 
        json={"content": "This should fail"}
    )
    
    assert response.status_code == 404

def test_delete_day_note():
    # Create a note first
    note_id = create_test_note()
    
    # Delete the note
    response = client.delete(f"/delete/{note_id}")
    
    assert response.status_code == 200
    data = response.json()
    
    assert data["message"] == "Note deleted successfully"
    
    # Verify it's deleted
    response = client.put(
        f"/update/{note_id}", 
        json={"content": "Should be deleted"}
    )
    assert response.status_code == 404

def test_delete_nonexistent_note():
    fake_id = str(uuid.uuid4())
    
    response = client.delete(f"/delete/{fake_id}")
    
    assert response.status_code == 404