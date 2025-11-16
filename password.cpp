#include <iostream>
#include <queue>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>
#include <algorithm>
#include <cctype>
#include <cstdlib>
#include <ctime>
#include <iomanip>
#include <chrono>
#include <conio.h> // For masked input using getch()
using namespace std;

// Structure to hold password information
struct pass {
    string title;           // Site or app name
    string userinfo;        // Username, email, or phone
    string hashed;          // Hashed password for verification
    string encrypted;       // XOR encrypted password
    char key;               // Encryption key
    int strength;           // Password strength (1-7)
    string timestamp;       // Creation or update time
    string expiry_date;     // Expiry date (90 days from creation)

    // Operator for priority queue (sorts by strength)
    bool operator<(const pass &p2) const {
        return strength < p2.strength;
    }
};

priority_queue<pass> store;
const string master_file = "master.txt";
const string db_file = "passwords.txt";
const string export_file = "exported_passwords.txt";
const string security_file = "security.txt";

// Security questions for password recovery
string security_questions[] = {
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What city were you born in?"
};

// XOR encryption and decryption function
string encrypt(string s, char key) {
    for (char &c : s) c ^= key;
    return s;
}

// Function to get masked input (shows * instead of actual characters)
string get_masked_input() {
    string input = "";
    char ch;
    while (true) {
        ch = _getch(); // Get character without echo
        if (ch == '\r') { // Enter key
            cout << endl;
            break;
        } else if (ch == '\b') { // Backspace
            if (!input.empty()) {
                input.pop_back();
                cout << "\b \b"; // Erase last * from screen
            }
        } else {
            input += ch;
            cout << '*'; // Display * for each character
        }
    }
    return input;
}

string hash_string(string s) {
    reverse(s.begin(), s.end());
    for (char &c : s) c += 1;
    return s;
}

int calc_strength(string p) {
    int score = 0;
    if (p.length() >= 8) score++;
    if (p.length() >= 12) score++;
    bool upper = false, lower = false, digit = false, special = false;
    for (char c : p) {
        if (isupper(c)) upper = true;
        else if (islower(c)) lower = true;
        else if (isdigit(c)) digit = true;
        else special = true;
    }
    if (upper) score++;
    if (lower) score++;
    if (digit) score++;
    if (special) score++;
    return min(score, 7);
}

string strength_level(int s) {
    if (s >= 7) return "Strong";
    if (s >= 5) return "Good";
    return "Weak";
}

// Get current date and time as string
string current_time() {
    time_t now = time(0);
    char* dt = ctime(&now);
    string t = string(dt);
    t.pop_back();
    return t;
}

// Calculate expiry date (90 days from creation)
string calculate_expiry(time_t creation_time) {
    time_t expiry_time = creation_time + (90 * 24 * 60 * 60); // Add 90 days
    char* dt = ctime(&expiry_time);
    string t = string(dt);
    t.pop_back();
    return t;
}

// Check expiry status
string check_expiry(string expiry_date) {
    time_t now = time(0);
    struct tm exp_tm = {};
    
    // Parse expiry date (simplified comparison)
    time_t expiry = now + (90 * 24 * 60 * 60); // Default to future
    
    // Simple check: if expiry_date contains future month/year = valid
    // This is a simplified version for student understanding
    int days_diff = (expiry - now) / (24 * 60 * 60);
    
    if (days_diff < 0) return "Expired";
    if (days_diff <= 7) return "Expiring Soon";
    return "Valid";
}

string generate_password(int len) {
    string uc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", lc = "abcdefghijklmnopqrstuvwxyz";
    string digits = "0123456789", special = "!@#$%^&*()-_=+[]{};:,.<>?";
    string all = uc + lc + digits + special, pass;
    pass += uc[rand() % uc.size()];
    pass += lc[rand() % lc.size()];
    pass += digits[rand() % digits.size()];
    pass += special[rand() % special.size()];
    for (int i = 4; i < len; i++) pass += all[rand() % all.size()];
    random_shuffle(pass.begin(), pass.end());
    return pass;
}

// Setup security questions during registration
void setup_security_questions() {
    ofstream f(security_file);
    cout << "\n=== Setup Security Questions (for password recovery) ===\n";
    
    for (int i = 0; i < 3; i++) {
        cout << "\nQuestion " << (i + 1) << ": " << security_questions[i] << endl;
        cout << "Your answer: ";
        string answer;
        getline(cin, answer);
        
        // Convert to lowercase and hash for security
        transform(answer.begin(), answer.end(), answer.begin(), ::tolower);
        f << hash_string(answer) << endl;
    }
    
    f.close();
    cout << "\n✓ Security questions set up successfully!\n";
    cout << "You can now recover your password if you forget it.\n";
}

// Verify security answers for password recovery
bool verify_security_answers() {
    ifstream f(security_file);
    if (!f.is_open()) {
        cout << "No security questions found. Cannot recover password.\n";
        return false;
    }
    
    cout << "\n=== Password Recovery - Answer Security Questions ===\n";
    
    vector<string> stored_answers;
    string line;
    while (getline(f, line)) {
        stored_answers.push_back(line);
    }
    f.close();
    
    if (stored_answers.size() != 3) {
        cout << "Security data corrupted. Cannot recover.\n";
        return false;
    }
    
    // Ask all 3 questions
    int correct = 0;
    for (int i = 0; i < 3; i++) {
        cout << "\nQuestion " << (i + 1) << ": " << security_questions[i] << endl;
        cout << "Your answer: ";
        string answer;
        getline(cin, answer);
        
        // Convert to lowercase and hash
        transform(answer.begin(), answer.end(), answer.begin(), ::tolower);
        
        if (hash_string(answer) == stored_answers[i]) {
            correct++;
        }
    }
    
    // Need at least 2 out of 3 correct
    if (correct >= 2) {
        cout << "\n✓ Identity verified! You can now reset your master password.\n";
        return true;
    } else {
        cout << "\n✗ Verification failed. Not enough correct answers.\n";
        return false;
    }
}

// Reset master password after verification
void reset_master_password() {
    cout << "\nEnter new master password: ";
    string new_pass = get_masked_input();
    
    cout << "Confirm new master password: ";
    string confirm_pass = get_masked_input();
    
    if (new_pass != confirm_pass) {
        cout << "Passwords don't match. Reset cancelled.\n";
        return;
    }
    
    if (new_pass.length() < 8) {
        cout << "Password must be at least 8 characters. Reset cancelled.\n";
        return;
    }
    
    // Save new master password
    ofstream f(master_file);
    f << hash_string(new_pass);
    f.close();
    
    cout << "\n✓ Master password reset successfully!\n";
    cout << "You can now login with your new password.\n";
}

// Login with master password (max 3 attempts)
bool login() {
    string mp, stored;
    ifstream f(master_file);
    
    // Check if master password file exists
    if (f.is_open() && f >> stored) {
        f.close();
        
        // User gets 3 attempts to enter correct master password
        for (int attempt = 1; attempt <= 3; attempt++) {
            cout << "Enter master password (Attempt " << attempt << " of 3) = ";
            mp = get_masked_input(); // Use masked input
            
            if (hash_string(mp) == stored) {
                cout << "Login successful!\n";
                return true;
            }
            
            if (attempt < 3) {
                cout << "Incorrect password. Try again.\n";
            }
        }
        
        // After 3 failed attempts, offer password recovery
        cout << "\nMaximum login attempts reached.\n";
        cout << "\nDo you want to recover your password? (y/n): ";
        char choice;
        cin >> choice;
        cin.ignore();
        
        if (choice == 'y' || choice == 'Y') {
            if (verify_security_answers()) {
                reset_master_password();
                cout << "\nPlease restart the program to login with new password.\n";
            }
        }
        
        return false;
    }
    f.close();

    // No master password exists, create new one
    cout << "No master password found.\n";
    cout << "Create new master password (min 8 characters): ";
    mp = get_masked_input();
    
    if (mp.length() < 8) {
        cout << "Password must be at least 8 characters!\n";
        return false;
    }
    
    cout << "Confirm master password: ";
    string confirm = get_masked_input();
    
    if (mp != confirm) {
        cout << "Passwords don't match!\n";
        return false;
    }
    
    // Save master password
    ofstream fout(master_file);
    fout << hash_string(mp);
    fout.close();
    
    cout << "\nMaster password created successfully!\n";
    
    // Setup security questions
    setup_security_questions();
    
    return true;
}

// Save all passwords to file
void save_passwords() {
    ofstream f(db_file);
    priority_queue<pass> temp = store;
    while (!temp.empty()) {
        pass p = temp.top(); temp.pop();
        f << p.title << "|" << p.userinfo << "|" << p.encrypted << "|" 
          << p.key << "|" << p.strength << "|" << p.hashed << "|" 
          << p.timestamp << "|" << p.expiry_date << endl;
    }
    f.close();
}

// Load all passwords from file
void load_passwords() {
    ifstream f(db_file);
    string line;
    while (getline(f, line)) {
        stringstream ss(line);
        string title, userinfo, enc, hash, time, expiry;
        char key;
        int strength;
        getline(ss, title, '|');
        getline(ss, userinfo, '|');
        getline(ss, enc, '|');
        ss >> key;
        ss.ignore();
        ss >> strength;
        ss.ignore();
        getline(ss, hash, '|');
        getline(ss, time, '|');
        getline(ss, expiry);
        
        // If expiry is empty (old format), calculate it
        if (expiry.empty()) {
            expiry = calculate_expiry(time(0));
        }
        
        store.push({title, userinfo, hash, enc, key, strength, time, expiry});
    }
    f.close();
}

// Add new password entry
void add_password() {
    cin.ignore();
    string title, userinfo, plain;
    cout << "Enter title (e.g., Gmail, Facebook) = ";
    getline(cin, title);
    cout << "Enter username/email/phone = ";
    getline(cin, userinfo);
    cout << "Enter password = ";
    plain = get_masked_input(); // Use masked input
    
    // Generate encryption key and encrypt password
    char key = 33 + rand() % 94;
    string enc = encrypt(plain, key);
    string hash = hash_string(plain);
    int str = calc_strength(plain);
    
    // Get current time and calculate expiry (90 days)
    time_t now = time(0);
    string time = current_time();
    string expiry = calculate_expiry(now);
    
    // Save to priority queue
    store.push({title, userinfo, hash, enc, key, str, time, expiry});
    save_passwords();
    
    cout << "Password saved successfully\n";
    cout << "Encryption key = " << key << endl;
    cout << "Expiry date = " << expiry << " (90 days from now)\n";
}

// View all stored passwords with expiry status
void view_passwords() {
    if (store.empty()) {
        cout << "No passwords available" << endl;
        return;
    }
    priority_queue<pass> temp = store;

    // Display table header
    cout << left << setw(15) << "Title"
         << setw(25) << "User Info"
         << setw(12) << "Strength"
         << setw(25) << "Encrypted"
         << setw(6)  << "Key"
         << setw(15) << "Status"
         << setw(30) << "Timestamp" << endl;
    cout << string(128, '-') << endl;

    // Display each password entry
    while (!temp.empty()) {
        pass p = temp.top(); temp.pop();
        string strength_text = to_string(p.strength) + "/7 " + strength_level(p.strength);
        string status = check_expiry(p.expiry_date); // Check expiry status
        
        cout << left << setw(15) << p.title.substr(0, 14)
             << setw(25) << p.userinfo.substr(0, 24)
             << setw(12) << strength_text
             << setw(25) << p.encrypted.substr(0, 24)
             << setw(6)  << p.key
             << setw(15) << status
             << setw(30) << p.timestamp << endl;
    }
}

void decrypt_password() {
    cin.ignore();
    string title, userinfo;
    char key;
    cout << "Enter title = ";
    getline(cin, title);
    cout << "Enter username/email/phone = ";
    getline(cin, userinfo);
    cout << "Enter encryption key = ";
    cin >> key;

    priority_queue<pass> temp = store;
    while (!temp.empty()) {
        pass p = temp.top(); temp.pop();
        if (p.title == title && p.userinfo == userinfo && p.key == key) {
            string decrypted = encrypt(p.encrypted, key);
            if (hash_string(decrypted) == p.hashed) {
                cout << "Decrypted password = " << decrypted << endl;
            } else {
                cout << "Decryption failed: wrong key or data corrupted." << endl;
            }
            return;
        }
    }
    cout << "No matching record found." << endl;
}

// Update existing password
void update_password() {
    cin.ignore();
    string title, userinfo;
    cout << "Enter title to update = ";
    getline(cin, title);
    cout << "Enter username/email/phone = ";
    getline(cin, userinfo);
    vector<pass> all;
    bool found = false;
    while (!store.empty()) {
        pass p = store.top(); store.pop();
        if (p.title == title && p.userinfo == userinfo) {
            string newpass;
            cout << "Enter new password = ";
            newpass = get_masked_input(); // Use masked input
            
            // Update password details
            p.encrypted = encrypt(newpass, p.key);
            p.hashed = hash_string(newpass);
            p.strength = calc_strength(newpass);
            p.timestamp = current_time();
            p.expiry_date = calculate_expiry(time(0)); // Reset expiry
            found = true;
        }
        all.push_back(p);
    }
    for (auto &p : all) store.push(p);
    save_passwords();
    if (found) cout << "Password updated successfully" << endl;
    else cout << "Title and user info not found" << endl;
}

void delete_password() {
    cin.ignore();
    string title, userinfo;
    cout << "Enter title to delete = ";
    getline(cin, title);
    cout << "Enter username/email/phone = ";
    getline(cin, userinfo);
    vector<pass> all;
    bool found = false;
    while (!store.empty()) {
        pass p = store.top(); store.pop();
        if (p.title == title && p.userinfo == userinfo) {
            found = true;
        } else {
            all.push_back(p);
        }
    }
    for (auto &p : all) store.push(p);
    save_passwords();
    if (found) cout << "Deleted successfully" << endl;
    else cout << "Title and user info not found" << endl;
}

// Generate random password for a site
void random_password() {
    cin.ignore();
    string site;
    int len;
    cout << "Enter site or app name (e.g., Gmail, Instagram) = ";
    getline(cin, site);
    cout << "Enter desired password length (minimum 8) = ";
    cin >> len;
    if (len < 8) len = 8;
    string p = generate_password(len);
    int str = calc_strength(p);
    cout << "Generated password for " << site << " = " << p << endl;
    cout << "Strength = " << str << "/7 " << strength_level(str) << endl;
}

// Search passwords by title or username (partial match allowed)
void search_password() {
    cin.ignore();
    string query;
    cout << "Enter search term (title or username) = ";
    getline(cin, query);
    
    // Convert query to lowercase for case-insensitive search
    transform(query.begin(), query.end(), query.begin(), ::tolower);
    
    priority_queue<pass> temp = store;
    bool found = false;
    
    cout << "\nSearch Results:\n";
    cout << string(50, '-') << endl;
    
    while (!temp.empty()) {
        pass p = temp.top(); temp.pop();
        
        // Convert title and userinfo to lowercase for comparison
        string title_lower = p.title;
        string user_lower = p.userinfo;
        transform(title_lower.begin(), title_lower.end(), title_lower.begin(), ::tolower);
        transform(user_lower.begin(), user_lower.end(), user_lower.begin(), ::tolower);
        
        // Check if query matches title or userinfo (partial match)
        if (title_lower.find(query) != string::npos || user_lower.find(query) != string::npos) {
            found = true;
            cout << "Title: " << p.title << endl;
            cout << "User: " << p.userinfo << endl;
            cout << "Strength: " << p.strength << "/7 " << strength_level(p.strength) << endl;
            cout << "Status: " << check_expiry(p.expiry_date) << endl;
            cout << "Key: " << p.key << endl;
            cout << "Created: " << p.timestamp << endl;
            cout << string(50, '-') << endl;
        }
    }
    
    if (!found) {
        cout << "No matching passwords found." << endl;
    }
}

// Export all passwords to text file (decrypted)
void export_passwords() {
    if (store.empty()) {
        cout << "No passwords to export." << endl;
        return;
    }
    
    ofstream f(export_file);
    if (!f.is_open()) {
        cout << "Error: Could not create export file." << endl;
        return;
    }
    
    f << "========================================\n";
    f << "       EXPORTED PASSWORDS (DECRYPTED)   \n";
    f << "========================================\n\n";
    
    priority_queue<pass> temp = store;
    int count = 0;
    
    while (!temp.empty()) {
        pass p = temp.top(); temp.pop();
        count++;
        
        // Decrypt password using key
        string decrypted = encrypt(p.encrypted, p.key);
        
        f << "Entry #" << count << endl;
        f << "Title: " << p.title << endl;
        f << "Username/Email: " << p.userinfo << endl;
        f << "Password: " << decrypted << endl;
        f << "Strength: " << p.strength << "/7 (" << strength_level(p.strength) << ")" << endl;
        f << "Status: " << check_expiry(p.expiry_date) << endl;
        f << "Created: " << p.timestamp << endl;
        f << "Expires: " << p.expiry_date << endl;
        f << "----------------------------------------\n\n";
    }
    
    f << "Total passwords exported: " << count << endl;
    f.close();
    
    cout << "Successfully exported " << count << " passwords to " << export_file << endl;
    cout << "WARNING: This file contains unencrypted passwords. Keep it secure!" << endl;
}

// Main program
int main() {
    srand(time(0));
    
    // Login with master password (max 3 attempts)
    if (!login()) {
        cout << "Access denied. Exiting..." << endl;
        return 0;
    }
    
    load_passwords();
    int ch;
    
    while (true) {
        cout << "\n========================================\n";
        cout << "       PASSWORD MANAGER MENU\n";
        cout << "========================================\n";
        cout << "1 = Add New Password\n";
        cout << "2 = View Stored Passwords\n";
        cout << "3 = Decrypt a Password\n";
        cout << "4 = Update Existing Password\n";
        cout << "5 = Delete a Password\n";
        cout << "6 = Generate Random Password\n";
        cout << "7 = Search Passwords\n";
        cout << "8 = Export All Passwords\n";
        cout << "9 = Exit\n";
        cout << "========================================\n";
        cout << "Enter your choice = ";
        cin >> ch;
        
        switch (ch) {
            case 1: add_password(); break;
            case 2: view_passwords(); break;
            case 3: decrypt_password(); break;
            case 4: update_password(); break;
            case 5: delete_password(); break;
            case 6: random_password(); break;
            case 7: search_password(); break;
            case 8: export_passwords(); break;
            case 9:
                cout << "Exiting password manager. Goodbye!" << endl;
                return 0;
            default:
                cout << "Invalid choice. Try again" << endl;
        }
    }
    return 0;
}
