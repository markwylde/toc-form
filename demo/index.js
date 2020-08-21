const minthril = require('minthril');
const hyperx = require('hyperx');
const html = hyperx(minthril);

const createForm = require('../');
const formFieldText = require('../formFieldText');
const formFieldSelect = require('../formFieldSelect');

const eventLog = [];

function demoApp (app) {
  const myForm = createForm(minthril, {
    fields: [{
      name: 'firstName',
      label: 'First Name',
      component: formFieldText,
      autoFocus: true,
      initialValue: 'Joe'
    }, {
      name: 'lastName',
      label: 'Last Name',
      component: formFieldText,
      initialValue: 'Bloggs'
    }, {
      name: 'location',
      label: 'Location',
      component: formFieldSelect,
      options: [{
        value: 'au',
        label: 'Australia'
      }, {
        value: 'uk',
        label: 'United Kingdom'
      }],
      initialValue: 'uk'
    }],
    onSubmit: (event, state) => {
      event.preventDefault();
      eventLog.unshift(['submitted', state]);
      render();
    },
    onInput: state => {
      eventLog.unshift(['inputted', state]);
      render();
    }
  });

  return html`
    <main >
      <section>
        <h1>Example Form</h1>

        <h2>Simple form</h2>
        <div class="exampleFormContainer">
          ${myForm}
        </div>

        <ul>
        ${eventLog.map(entry => {
          return html`
            <li>
        <strong>${entry[0]}</strong>
              ${JSON.stringify(entry[1])}
          </li>
          `;
        })}
        </ul>
      </section>
    </main>
  `;
}

function render () {
  minthril.render(document.body, demoApp());
}

document.addEventListener('DOMContentLoaded', function () {
  render();
});
