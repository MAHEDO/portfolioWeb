/**
 * Contact Form Handler
 * Handles form submission to Web3Forms with loading states and feedback
 */

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.btnText = document.getElementById('btn-text');
        this.btnSpinner = document.getElementById('btn-spinner');
        this.successMessage = document.getElementById('success-message');
        this.errorMessage = document.getElementById('error-message');

        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Close message handlers
        document.querySelectorAll('.close-message').forEach(btn => {
            btn.addEventListener('click', () => this.hideMessages());
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Show loading state
        this.setLoading(true);
        this.hideMessages();

        const formData = new FormData(this.form);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.showSuccess();
                this.form.reset();
            } else {
                this.showError(result.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('Network error. Please check your connection and try again.');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(isLoading) {
        this.submitBtn.disabled = isLoading;
        this.btnText.classList.toggle('hidden', isLoading);
        this.btnSpinner.classList.toggle('hidden', !isLoading);

        if (isLoading) {
            this.submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
        } else {
            this.submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
        }
    }

    showSuccess() {
        this.successMessage.classList.remove('hidden', 'translate-x-full');
        this.successMessage.classList.add('translate-x-0');

        // Auto-hide after 5 seconds
        setTimeout(() => this.hideMessages(), 5000);
    }

    showError(message) {
        const errorText = this.errorMessage.querySelector('.error-text');
        if (errorText) {
            errorText.textContent = message;
        }
        this.errorMessage.classList.remove('hidden', 'translate-x-full');
        this.errorMessage.classList.add('translate-x-0');
    }

    hideMessages() {
        this.successMessage.classList.add('translate-x-full');
        this.errorMessage.classList.add('translate-x-full');

        setTimeout(() => {
            this.successMessage.classList.add('hidden');
            this.errorMessage.classList.add('hidden');
        }, 300);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});
