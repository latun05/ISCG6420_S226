
// PART 2: SIDEBAR AD
(function() {
    const scenes = document.querySelectorAll('.sidebar-scene');
    const student = document.getElementById('sidebar-student');
    let currentIndex = 0;
    let intervalId = null;
    let timeoutId = null;

    function resetAllScenes() {
        scenes.forEach(scene => {
            scene.classList.remove('active');
            const text = scene.querySelector('.sidebar-text');
            const sub = scene.querySelector('.sidebar-sub');
            const desc = scene.querySelector('.sidebar-desc');
            [text, sub, desc].forEach(el => {
                if (el) {
                    el.style.transition = 'none';
                    el.style.transform = 'translateX(-100%)';
                    el.style.opacity = '0';
                }
            });
        });
        student.style.transition = 'none';
        student.style.opacity = '0';

        void document.body.offsetWidth;

        scenes.forEach(scene => {
            const text = scene.querySelector('.sidebar-text');
            const sub = scene.querySelector('.sidebar-sub');
            const desc = scene.querySelector('.sidebar-desc');
            [text, sub, desc].forEach(el => {
                if (el) {
                    el.style.transition = '';
                    el.style.transform = '';   
                    el.style.opacity = '';     
                }
            });
        });
        student.style.transition = '';
        student.style.opacity = '';            
    }

    function showScene(index) {
        scenes.forEach(scene => {
            scene.classList.remove('active');
        });

        const target = scenes[index];
        if (target) {
            target.classList.add('active');
        }
    }

    function runSequence() {
        if (intervalId) clearInterval(intervalId);
        if (timeoutId) clearTimeout(timeoutId);

        resetAllScenes();
        currentIndex = 0;

        showScene(currentIndex);

        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % scenes.length;
            showScene(currentIndex);

            if (currentIndex === scenes.length - 1) {
                timeoutId = setTimeout(() => {
                    student.style.transition = 'opacity 0.5s ease';
                    student.style.opacity = '1';
                }, 3500);
            }
        }, 3500);
    }

    document.getElementById('replay-btn').addEventListener('click', function() {
        if (intervalId) clearInterval(intervalId);
        if (timeoutId) clearTimeout(timeoutId);
        runSequence();
    });

    window.addEventListener('load', runSequence);
})();

// PART 3: REGISTRATION SYSTEM
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('#progress-bar .step');
    const progressText = document.getElementById('progress-text');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const summaryDiv = document.getElementById('summary');
    const summaryContent = document.getElementById('summary-content');
    const doneBtn = document.getElementById('done-btn');

    let currentStep = 0;
    const totalSteps = steps.length;

    const formData = {
        dob: '',
        entourage: '',
        name: '',
        email: '',
        skills: [],
        terms: false
    };

    function updateStepUI() {
        steps.forEach((step, idx) => {
            step.classList.toggle('active', idx === currentStep);
        });
        progressSteps.forEach((el, idx) => {
            el.classList.toggle('active', idx <= currentStep);
        });
        progressText.textContent = `Step ${currentStep + 1} of ${totalSteps}`;
        prevBtn.disabled = (currentStep === 0);
        nextBtn.textContent = (currentStep === totalSteps - 1) ? 'Submit' : 'Next';
    }

    function saveCurrentStepData() {
        const step = steps[currentStep];
        const inputs = step.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (input.name === 'skills') {
                    if (input.checked) {
                        if (!formData.skills.includes(input.value)) {
                            formData.skills.push(input.value);
                        }
                    } else {
                        formData.skills = formData.skills.filter(v => v !== input.value);
                    }
                } else if (input.name === 'terms') {
                    formData.terms = input.checked;
                }
            } else {
                formData[input.name] = input.value;
            }
        });
    }

    function loadCurrentStepData() {
        const step = steps[currentStep];
        const inputs = step.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (input.name === 'skills') {
                    input.checked = formData.skills.includes(input.value);
                } else if (input.name === 'terms') {
                    input.checked = formData.terms;
                }
            } else {
                if (formData[input.name] !== undefined) {
                    input.value = formData[input.name];
                }
            }
        });
    }

    function validateCurrentStep() {
        const step = steps[currentStep];
        const inputs = step.querySelectorAll('input[required]');
        let valid = true;
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (!input.checked) valid = false;
            } else {
                if (!input.value.trim()) valid = false;
            }
        });
        const emailInput = step.querySelector('input[type="email"]');
        if (emailInput && emailInput.value.trim() && !emailInput.validity.valid) {
            valid = false;
        }
        return valid;
    }

    function goToStep(stepIndex) {
        if (stepIndex < 0 || stepIndex >= totalSteps) return;
        saveCurrentStepData();
        currentStep = stepIndex;
        updateStepUI();
        loadCurrentStepData();
        summaryDiv.style.display = 'none';
        form.style.display = 'block';
    }

    function resetForm() {
        formData.dob = '';
        formData.entourage = '';
        formData.name = '';
        formData.email = '';
        formData.skills = [];
        formData.terms = false;
        document.querySelectorAll('#registration-form input').forEach(inp => {
            if (inp.type === 'checkbox') inp.checked = false;
            else inp.value = '';
        });
        currentStep = 0;
        updateStepUI();
        loadCurrentStepData();
        summaryDiv.style.display = 'none';
        form.style.display = 'block';
    }

    function showSummary() {
        const skillDisplayNames = {
            'web': 'Web Development',
            'data': 'Data Analysis',
            'design': 'UI/UX Design',
            'cyber': 'Cybersecurity'
        };
        const skillsDisplay = formData.skills.length
            ? formData.skills.map(s => skillDisplayNames[s] || s).join(', ')
            : 'None selected';
        const summary = `
Date of Birth:       ${formData.dob}
Entourage Size:      ${formData.entourage}
Contact Name:        ${formData.name}
Email:               ${formData.email}
Technical Skills:    ${skillsDisplay}
Terms Accepted:      ${formData.terms ? 'Yes' : 'No'}
        `;
        summaryContent.textContent = summary;
        summaryDiv.style.display = 'block';
        form.style.display = 'none';
    }

    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (!validateCurrentStep()) {
            alert('Please fill in all required fields correctly.');
            return;
        }
        saveCurrentStepData();
        if (currentStep === totalSteps - 1) {
            if (!formData.terms) {
                alert('You must accept the Terms & Conditions.');
                return;
            }
            showSummary();
            return;
        }
        goToStep(currentStep + 1);
    });

    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        saveCurrentStepData();
        goToStep(currentStep - 1);
    });

    doneBtn.addEventListener('click', function() {
        resetForm();
    });

    updateStepUI();
    loadCurrentStepData();
});