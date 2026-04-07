const COURSE_GROUPS = [
    {
      label: "University Institute of Engineering & Technology",
      options: [
        { value: "B.Tech Computer Science and Engineering", label: "B.Tech CSE - Bachelor of Technology in Computer Science and Engineering" },
        { value: "B.Tech IT", label: "B.Tech IT - Bachelor of Technology in Information Technology" },
        { value: "B.Tech ECE", label: "B.Tech ECE - Bachelor of Technology in Electronics and Communication Engineering" },
        { value: "M.Tech CSE", label: "M.Tech CSE - Master of Technology in Computer Science and Engineering" },
        { value: "M.Tech ECE", label: "M.Tech ECE - Master of Technology in Electronics and Communication Engineering" },
      ],
    },
    {
      label: "University Institute of Emerging Technologies",
      options: [
        { value: "B.Tech CSE - AIML", label: "B.Tech CSE - AIML - Bachelor of Technology in Computer Science and Engineering (AI & ML)" },
        { value: "B.Tech CSE - DS", label: "B.Tech CSE - DS - Bachelor of Technology in Computer Science and Engineering (Data Science)" },
        { value: "B.Tech CSE - CS", label: "B.Tech CSE - CS - Bachelor of Technology in Computer Science and Engineering (Cyber Security)" },
        { value: "B.Tech CSE - SAP", label: "B.Tech CSE - SAP - Bachelor of Technology in Computer Science and Engineering (SAP)" },
        { value: "B.Tech AIML - IBM", label: "B.Tech AIML - IBM - Bachelor of Technology in IBM-Powered AI & ML" },
        { value: "B.Tech Biotechnology", label: "B.Tech Biotechnology - Bachelor of Technology in Biotechnology" },
        { value: "M.Tech Biotechnology", label: "M.Tech Biotechnology - Master of Technology in Biotechnology" },
      ],
    },
    {
      label: "University Institute of Computer Science & Applications",
      options: [
        { value: "B.Sc Digital Forensic", label: "B.Sc Digital Forensic - Bachelor of Science in Digital Forensics" },
        { value: "BCA - General", label: "BCA - General - Bachelor of Computer Applications (General)" },
        { value: "BCA in AI / CS / DS", label: "BCA in AI / CS / DS - Bachelor of Computer Applications in AI / CS / DS" },
        { value: "MCA - General", label: "MCA - General - Master of Computer Applications (General)" },
        { value: "MCA in AI / CS / DS", label: "MCA in AI / CS / DS - Master of Computer Applications in AI / CS / DS" },
      ],
    },
    {
      label: "University Institute of Management & Commerce",
      options: [
        { value: "BBA - General", label: "BBA - General - Bachelor of Business Administration (General)" },
        { value: "BBA - Business Analytics", label: "BBA - Business Analytics - Bachelor of Business Administration in Business Analytics" },
        { value: "MBA - HR / Finance / Marketing", label: "MBA - HR / Finance / Marketing - Master of Business Administration (HR / Finance / Marketing)" },
        { value: "BBA - Artificial Intelligence", label: "BBA - Artificial Intelligence - Bachelor of Business Administration in AI / DS" },
        { value: "MBA - BA / FinTech / NSE / ED", label: "MBA - BA / FinTech / NSE / ED - Master of Business Administration in BA / FinTech / NSE / ED" },
      ],
    },
    {
      label: "University Institute of Allied & Healthcare Sciences",
      options: [
        { value: "BPT", label: "BPT - Bachelor of Physiotherapy" },
        { value: "B.AOTT", label: "B.AOTT - Bachelor of Anesthesia & Operation Theatre Technology" },
        { value: "B.MRIT", label: "B.MRIT - Bachelor of Medical Radiology & Imaging Technology" },
        { value: "B.EMT", label: "B.EMT - Bachelor of Emergency Medical Technologist (Paramedic)" },
        { value: "B.MLS", label: "B.MLS - Bachelor of Medical Laboratory Sciences" },
        { value: "B.Sc CVT", label: "B.Sc CVT - Bachelor of Science in Cardiovascular Technology" },
        { value: "MPT", label: "MPT - Master of Physiotherapy" },
      ],
    },
    {
      label: "University Institute of Agriculture",
      options: [
        { value: "B.Sc (Hons) Agriculture", label: "B.Sc (Hons) Agriculture - Bachelor of Science (Honours) in Agriculture" },
        { value: "B.Tech Agricultural Engineering", label: "B.Tech Agricultural Engineering - Bachelor of Technology in Agricultural Engineering" },
      ],
    },
    {
      label: "University Institute of Law",
      options: [
        { value: "B.A. LLB (Hons)", label: "B.A. LLB (Hons) - 5 Years Integrated" },
        { value: "LLB (Hons)", label: "LLB (Hons) - 3 Years" },
        { value: "BBA LLB Integrated", label: "BBA LLB Integrated - Bachelor of Business Administration + LLB" },
      ],
    },
    {
      label: "University Institute of Pharmaceutical Sciences",
      options: [
        { value: "B.Pharmacy", label: "B.Pharmacy - Bachelor of Pharmacy" },
      ],
    },
];

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxCKa6CDKwiykMiDuZ46fTg_PzTGSM2YooWWLy3Uui2uF9l469YHv7_7D7l2fXFEwYn/exec";

// ─── Initialization ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    const form = document.getElementById('admissionForm');
    const countrySelect = document.getElementById('country');
    const stateSelect = document.getElementById('state');
    const phoneCodeInput = document.getElementById('phoneCode');
    const courseSelect = document.getElementById('course');
    const clearBtn = document.getElementById('clearBtn');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const formFields = document.getElementById('formFields');

    // State Management for CSC
    let allCountries = [];
    try {
        // Some versions of CSC on CDN use window.Country/State
        allCountries = window.Country ? Country.getAllCountries() : [];
    } catch(e) {
        console.error("CSC Library failed to load", e);
    }

    // Populate Courses
    COURSE_GROUPS.forEach(group => {
        const optGroup = document.createElement('optgroup');
        optGroup.label = group.label;
        group.options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            optGroup.appendChild(option);
        });
        courseSelect.appendChild(optGroup);
    });

    // Populate Countries
    if (allCountries.length > 0) {
        allCountries.forEach(country => {
            const option = document.createElement('option');
            option.value = country.name;
            option.textContent = country.name;
            countrySelect.appendChild(option);
        });
    }

    // ─── Event Handlers ─────────────────────────────────────────────────────
    
    countrySelect.addEventListener('change', (e) => {
        const countryName = e.target.value;
        const countryObj = allCountries.find(c => c.name === countryName);
        
        // Reset state select
        stateSelect.innerHTML = '<option value="">Choose a state...</option>';
        stateSelect.disabled = true;
        
        if (countryObj) {
            // Update Phone Code (using .phone from local data)
            phoneCodeInput.value = `${countryObj.phone}`;
            
            // Populate States (using .code from local data)
            const states = State.getStatesOfCountry(countryObj.code);
            if (states && states.length > 0) {
                stateSelect.disabled = false;
                states.forEach(s => {
                    const option = document.createElement('option');
                    option.value = s.name;
                    option.textContent = s.name;
                    stateSelect.appendChild(option);
                });
            } else {
                stateSelect.innerHTML = '<option value="">No states available</option>';
            }
        }
    });

    clearBtn.addEventListener('click', () => {
        form.reset();
        stateSelect.innerHTML = '<option value="">Choose a state...</option>';
        stateSelect.disabled = true;
        phoneCodeInput.value = "+91";
        // Clear errors
        document.querySelectorAll('.field-group').forEach(group => group.classList.remove('has-error'));
        document.querySelectorAll('.error-msg').forEach(msg => msg.textContent = '');
    });

    // ─── Validation & Submission ───────────────────────────────────────────
    
    const validate = () => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        let isValid = true;

        const setFieldError = (id, msg) => {
            const field = document.getElementById(id);
            const group = field.closest('.field-group');
            const errorSpan = document.getElementById(id + 'Error');
            if (msg) {
                group.classList.add('has-error');
                errorSpan.textContent = msg;
                isValid = false;
            } else {
                group.classList.remove('has-error');
                errorSpan.textContent = '';
            }
        };

        // Name
        if (!data.name || data.name.length < 2) setFieldError('name', "Name must be at least 2 characters.");
        else if (!/^[a-zA-Z\s]*$/.test(data.name)) setFieldError('name', "Name can only contain letters.");
        else setFieldError('name', null);

        // Email
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) setFieldError('email', "Enter a valid email address.");
        else setFieldError('email', null);

        // Phone
        if (!data.phone || data.phone.length < 6 || data.phone.length > 15 || !/^\d+$/.test(data.phone)) setFieldError('phone', "Enter a valid phone number.");
        else setFieldError('phone', null);

        // Course
        if (!data.course) setFieldError('course', "Please select a course.");
        else setFieldError('course', null);

        // Country
        if (!data.country) setFieldError('country', "Please select a country.");
        else setFieldError('country', null);

        // Education
        if (!data.educationDetails) setFieldError('educationDetails', "Please provide education details.");
        else setFieldError('educationDetails', null);

        return isValid;
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (!validate()) return;

        // Start Loading State
        const submitBtn = document.getElementById('submitBtn');
        const btnText = document.getElementById('btnText');
        const btnIcon = document.getElementById('btnIcon');
        
        submitBtn.disabled = true;
        const originalBtnText = btnText.textContent;
        btnText.textContent = "Submitting...";
        btnIcon.className = "loading-spinner";

        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Format phone as Next.js app does
            const fullPhone = `'${data.phoneCode || ""} ${data.phone}`.trim();

            const params = new URLSearchParams();
            params.append("submittedAt", new Date().toISOString());
            params.append("name", data.name);
            params.append("email", data.email);
            params.append("phone", fullPhone);
            params.append("course", data.course);
            params.append("country", data.country);
            params.append("state", data.state || "");
            params.append("educationDetails", data.educationDetails || "");

            const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // Apps Script often requires no-cors for direct POSTs
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: params.toString(),
            });

            // Since we use no-cors, we won't get a "status: 200" easily, 
            // but if it didn't throw, we assume success or handle it based on UX.
            // In a pro setup, we'd use a serverless function, but for fully static, 
            // no-cors is the standard way to ping Apps Script.

            // Success Transition
            formFields.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            // Reset after 10 seconds
            setTimeout(() => {
                successMessage.classList.add('hidden');
                formFields.classList.remove('hidden');
                form.reset();
                stateSelect.disabled = true;
                phoneCodeInput.value = "+91";
            }, 10000);

        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit enquiry. Please check your connection and try again.");
        } finally {
            submitBtn.disabled = false;
            btnText.textContent = originalBtnText;
            btnIcon.className = "";
            btnIcon.setAttribute('data-lucide', 'chevron-right');
            lucide.createIcons();
        }
    });
});

