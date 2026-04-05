// Data for the form
const COURSE_GROUPS = [
    { label: "Engineering", options: ["B.Tech CSE", "B.Tech AI & ML", "B.Tech Mechanical", "MCA"] },
    { label: "Management", options: ["BBA", "MBA", "B.Com"] },
    { label: "Pharmacy", options: ["B.Pharm", "D.Pharm"] }
];

const COUNTRIES = [
    { name: "India", code: "+91", states: ["Andhra Pradesh", "Telangana", "Delhi", "Maharashtra", "Karnataka"] },
    { name: "United States", code: "+1", states: ["California", "New York", "Texas"] },
    { name: "United Kingdom", code: "+44", states: ["London", "Manchester", "Birmingham"] },
    { name: "Canada", code: "+1", states: ["Ontario", "Quebec", "British Columbia"] }
];

// Initialize Lucide Icons
lucide.createIcons();

const form = document.getElementById('admissionForm');
const countrySelect = document.getElementById('country');
const stateSelect = document.getElementById('state');
const phoneCodeInput = document.getElementById('phoneCode');
const courseSelect = document.getElementById('course');
const clearBtn = document.getElementById('clearBtn');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const formFields = document.getElementById('formFields');

// Populate Countries
COUNTRIES.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.name;
    opt.textContent = c.name;
    countrySelect.appendChild(opt);
});

// Populate Courses
COURSE_GROUPS.forEach(g => {
    const optGroup = document.createElement('optgroup');
    optGroup.label = g.label;
    g.options.forEach(o => {
        const opt = document.createElement('option');
        opt.value = o;
        opt.textContent = o;
        optGroup.appendChild(opt);
    });
    courseSelect.appendChild(optGroup);
});

// Country Change Logic
countrySelect.addEventListener('change', (e) => {
    const country = COUNTRIES.find(c => c.name === e.target.value);
    
    // Clear states
    stateSelect.innerHTML = '<option value="">Choose a state...</option>';
    
    if (country) {
        stateSelect.disabled = false;
        phoneCodeInput.value = country.code;
        country.states.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s;
            opt.textContent = s;
            stateSelect.appendChild(opt);
        });
    } else {
        stateSelect.disabled = true;
        phoneCodeInput.value = "+91";
    }
});

// Clear Form
clearBtn.addEventListener('click', () => {
    form.reset();
    stateSelect.disabled = true;
    phoneCodeInput.value = "+91";
});

// Handle Submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Submitting...';

    // Simulate API call
    setTimeout(() => {
        formFields.classList.add('hidden');
        successMessage.classList.remove('hidden');
        
        // Finalize
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Reset after 3 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
            formFields.classList.remove('hidden');
            form.reset();
        }, 5000);
    }, 1500);
});
