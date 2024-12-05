import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;

const saveFormState = throttle(() => {
  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

const populateForm = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    const { email, message } = JSON.parse(savedData);
    emailInput.value = email || '';
    messageTextarea.value = message || '';
  }
};

form.addEventListener('input', saveFormState);

form.addEventListener('submit', event => {
  event.preventDefault();

  const formData = {
    email: emailInput.value,
    message: messageTextarea.value,
  };

  console.log('Form submitted:', formData);

  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});

populateForm();
