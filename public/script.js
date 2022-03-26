/**
 * Contact Form Functionality
 */

const contactForm = document.getElementById('contact');
const loading = document.getElementById('loading');
const success = document.getElementById('success');
const errorEl = document.getElementById('error');

const hideAllContainers = () => {
    contactForm.style.display = 'none';
    loading.style.display = 'none';
    success.style.display = 'none';
    errorEl.style.display = 'none';
}

const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    try {
        contactForm.classList.add('animate-pulse');
        loading.style.display = 'block';
        const { name, email, message } = e.target;
        const body = {
            name: name.value,
            email: email.value,
            message: message.value,
        }
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        if(response.status !== 200) throw response;
        hideAllContainers();
        contactForm.classList.remove('animate-pulse');
        success.style.display = 'block';
    } catch (error) {
        hideAllContainers();
        errorEl.style.display = 'flex';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    hideAllContainers();
    contactForm.style.display = 'flex';
    contactForm.addEventListener("submit", handleContactFormSubmit);
})