document.addEventListener('DOMContentLoaded', () => {
    const jobRoles = [
        "Software Engineer", "Frontend Developer", "Backend Developer", "Full Stack Developer",
        "Mobile App Developer", "Android Developer", "iOS Developer", "DevOps Engineer",
        "Cloud Engineer", "Data Scientist", "Machine Learning Engineer", "Artificial Intelligence Engineer",
        "Data Analyst", "Business Analyst", "Product Manager", "Project Manager",
        "Scrum Master", "QA Engineer", "Automation Test Engineer", "Manual Test Engineer",
        "UI/UX Designer", "Graphic Designer", "Web Designer", "Technical Writer",
        "Database Administrator", "SQL Developer", "Big Data Engineer", "Hadoop Developer",
        "Spark Developer", "Data Engineer", "ETL Developer", "Blockchain Developer",
        "Cybersecurity Analyst", "Ethical Hacker", "Network Engineer", "System Administrator",
        "IT Support Specialist", "IT Consultant", "Solutions Architect", "Enterprise Architect",
        "Software Architect", "Application Support Engineer", "Embedded Systems Engineer", "Firmware Engineer",
        "Game Developer", "Unity Developer", "AR/VR Developer", "Python Developer",
        "Java Developer", "C++ Developer", "C# Developer", ".NET Developer",
        "PHP Developer", "Ruby on Rails Developer", "Node.js Developer", "Angular Developer",
        "React Developer", "Vue.js Developer", "Django Developer", "Flask Developer",
        "Spring Boot Developer", "Laravel Developer", "WordPress Developer", "Magento Developer",
        "Shopify Developer", "Salesforce Developer", "SAP Consultant", "Oracle Developer",
        "ERP Implementation Specialist", "CRM Developer", "BI Developer", "Power BI Developer",
        "Tableau Developer", "QlikView Developer", "SAS Developer", "R Developer",
        "MATLAB Developer", "API Developer", "Microservices Developer", "Kubernetes Administrator",
        "Docker Specialist", "Site Reliability Engineer (SRE)", "Release Manager", "Configuration Manager",
        "Change Manager", "Incident Manager", "Problem Manager", "IT Auditor",
        "Compliance Officer", "Risk Manager", "Digital Marketing Specialist", "SEO Specialist",
        "Content Writer", "Social Media Manager", "Growth Hacker", "Product Owner",
        "Agile Coach", "Business Development Manager", "Sales Engineer", "Pre-Sales Consultant",
        "Customer Success Manager", "Technical Support Engineer", "Hardware Engineer", "IoT Developer",
        "Robotics Engineer", "Computer Vision Engineer", "NLP Engineer", "Chatbot Developer",
        "Voice Assistant Developer", "Cloud Architect", "AWS Solutions Architect", "Azure Developer",
        "Google Cloud Engineer", "AI Research Scientist", "Quantum Computing Engineer", "Bioinformatics Specialist",
        "Fintech Developer", "Edtech Developer", "Healthtech Developer", "E-commerce Specialist",
        "Supply Chain Analyst", "Logistics Analyst", "GIS Developer", "3D Modeler",
        "Animator", "Video Editor", "Audio Engineer", "Game Tester",
        "Localization Specialist", "Translation Specialist", "Legal Tech Consultant", "HR Tech Specialist",
        "Recruitment Consultant", "Learning & Development Specialist", "Corporate Trainer", "IT Trainer",
        "Coding Instructor", "Freelance Developer", "Startup Founder", "Tech Entrepreneur",
        "Venture Capitalist", "Angel Investor", "Tech Journalist", "Tech Blogger",
        "Open Source Contributor", "Community Manager", "Event Manager", "Tech Evangelist",
        "Innovation Manager", "RPA Developer", "Low-Code/No-Code Developer", "Chatbot Trainer",
        "AI Ethicist", "Data Privacy Officer", "Cloud Security Engineer", "Penetration Tester",
        "Digital Forensics Analyst", "Incident Response Specialist", "Threat Intelligence Analyst", "Malware Analyst",
        "Cryptography Specialist", "Compliance Analyst", "IT Procurement Specialist", "Vendor Manager",
        "IT Finance Analyst", "IT Strategy Consultant"
    ].sort((a, b) => a.localeCompare(b));

    const urlParams = new URLSearchParams(window.location.search);
    const firstName = urlParams.get('firstName');
    if (firstName) {
        const heroParagraph = document.querySelector('.hero p');
        if (heroParagraph) {
            const localDate = new Date();
            const localTimeString = localDate.toLocaleString();
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            heroParagraph.innerHTML = `Hello, <strong>${firstName}</strong>! 🚀 Transform your job search with AI-powered resume analysis and personalized career insights. Your Local Time: ${localTimeString} (Time Zone: ${timeZone})`;
        }
    }

    const jobRoleSearch = document.getElementById('jobRoleSearch');
    const jobRoleInput = document.getElementById('jobRole');
    const suggestionsBox = document.getElementById('jobRoleSuggestions');

    if (jobRoleSearch && jobRoleInput && suggestionsBox) {
        jobRoleSearch.addEventListener('input', () => {
            const query = jobRoleSearch.value.trim().toLowerCase();
            suggestionsBox.innerHTML = '';
            suggestionsBox.style.display = 'none';

            if (query) {
                const filteredRoles = jobRoles.filter(role => role.toLowerCase().startsWith(query));
                if (filteredRoles.length > 0) {
                    filteredRoles.forEach(role => {
                        const suggestion = document.createElement('div');
                        suggestion.classList.add('suggestion-item');
                        suggestion.textContent = role;
                        suggestion.addEventListener('click', () => {
                            jobRoleSearch.value = role;
                            jobRoleInput.value = role;
                            suggestionsBox.innerHTML = '';
                            suggestionsBox.style.display = 'none';
                        });
                        suggestionsBox.appendChild(suggestion);
                    });
                    suggestionsBox.style.display = 'block';
                }
            }
        });

        document.addEventListener('click', (e) => {
            if (!jobRoleSearch.contains(e.target) && !suggestionsBox.contains(e.target)) {
                suggestionsBox.style.display = 'none';
            }
        });
    }

    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        resumeForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const resultContent = document.getElementById('resultContent');
            const loading = document.getElementById('loading');
            const submitBtn = document.querySelector('.submit-btn');

            if (resultContent && loading && submitBtn) {
                resultContent.style.opacity = '0';
                resultContent.innerHTML = '';
                resultContent.classList.remove('error', 'result-success');
                loading.style.display = 'block';
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.6';
            }

            const resumeFile = document.getElementById('resume')?.files[0];
            const jobRole = jobRoleInput?.value || jobRoleSearch?.value;
            const firstNameInput = firstName || 'N/A';
            const emailInput = 'N/A';
            const phoneInput = 'N/A';

            if (!resumeFile || !jobRole) {
                showError('Please upload a resume and select a job role.');
                return;
            }

            const formData = new FormData();
            formData.append('resume', resumeFile);
            formData.append('jobRole', jobRole);
            formData.append('firstName', firstNameInput);
            formData.append('email', emailInput);
            formData.append('phone', phoneInput);

            const apiUrl = 'https://cmd-q2zw.onrender.com/upload'; // Updated to backend URL with /upload endpoint

            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Server responded with ${response.status}: ${errorText}`);
                }

                const data = await response.json();
                if (loading && submitBtn) {
                    loading.style.display = 'none';
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }

                if (data.error) {
                    showError(data.error);
                } else {
                    resultContent.classList.add('result-success');
                    resultContent.innerHTML = `
                        <p><h3>Analysis Results</h3></p>
                        <p><strong>Target Role:</strong> ${data.jobRole}</p>
                        <p><strong>Hiring Probability:</strong> ${data.probability}%</p>
                        <p><strong>Recommendations:</strong></p>
                        <p><span><strong>Skills:</strong> ${data.additionalSkills || 'None identified'}</span></p>
                        <p><span><strong>Frameworks:</strong> ${data.additionalFrameworks || 'None identified'}</span></p>
                        <p><strong>Feedback:</strong> ${data.feedback}</p>
                    `;
                    resultContent.style.opacity = '1';
                    resultContent.style.transition = 'opacity 0.5s ease';
                }
            } catch (error) {
                console.error('Fetch Error:', error.message);
                showError(`An error occurred: ${error.message}`);
            }

            function showError(message) {
                if (loading && submitBtn && resultContent) {
                    loading.style.display = 'none';
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    resultContent.classList.add('error');
                    resultContent.innerHTML = `<p>${message}</p>`;
                    resultContent.style.opacity = '1';
                    resultContent.style.transition = 'opacity 0.5s ease';
                }
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        });
    });
});