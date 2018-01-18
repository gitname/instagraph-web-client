import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Header, Icon, Input, Label } from 'semantic-ui-react';

// Define this component's style rules using regular CSS; since this
// component's style rules utilize pseudo-classes, which are not
// supported by inline styles.
//
import "./UsernameForm.css";

// Define input validation functions that integrate with `redux-form`;
// meaning they return `undefined` if the value passed in is valid, and
// return an error message string if the value passed in is invalid.
//
// Reference: https://redux-form.com/7.2.0/examples/fieldlevelvalidation
//
export const usernameValidators = {
  isNotEmpty: (username) => {
    if (!username) {
      return "Username cannot be empty"
    }
  },
  hasValidFormat: (username) => {
    const validUsernameRegExp = /^[._A-Za-z0-9]+$/;
    if (validUsernameRegExp.test(username) === false) {
      return "Stick to letters, numbers, periods, and underscores"
    }
  }
};

// Render a component that contains an instance of a Semantic UI React
// `<Input />` component and some related components.
//
// Wire up the `<Input />` component's `onChange` handler so it invokes the
// `onChange` function passed in as a prop and passes it the entered value.
//
// Note: This wiring-up is necessary in order to use the `onChange` function
// provided by `redux-form`; since that function expects to receive the entered
// value as its *first* parameter, but the `<Input />` component would pass it
// as a *property* of the *second* parameter.
//
// Reference: https://redux-form.com/6.5.0/docs/faq/customcomponent.md
//
const ReduxFormSUIInput = (props) => {
  const {iconName, input, instructions, meta, submitHandler, ...otherProps} = props;
  const {error} = meta;
  const {onChange, value} = input;

  // Define some reusable conditions.
  const errorOccurred = (typeof(error) !== "undefined");
  const valueIsEmpty = (value === "");

  // Determine whether to render certain components.
  const displayInstructions = (valueIsEmpty);
  const displayError = (errorOccurred && !valueIsEmpty);

  // Determine the appearance and functionality of the icon.
  const useIconAsSubmitButton = (!errorOccurred && !valueIsEmpty);
  const iconClickHandler = useIconAsSubmitButton ? submitHandler : null;
  const iconColor = useIconAsSubmitButton ? "purple" : "grey";

  // Define the icon that will be included in the `<Input />` component.
  const icon = (
    <Icon
      circular
      color={iconColor}
      inverted={useIconAsSubmitButton}
      link={useIconAsSubmitButton}
      name={iconName}
      onClick={iconClickHandler}
    />
  );

  return (
    <div>
      <Input
        onChange={(event, data) => onChange(data.value)}
        error={displayError}
        icon={icon}
        {...otherProps}
      />

      {
        displayInstructions &&
        <Label basic color="purple" content={instructions} pointing />
      }

      {
        displayError &&
        <Label color="red" content={error} pointing />
      }
    </div>
  );
};

ReduxFormSUIInput.propTypes = {
  iconName: PropTypes.string.isRequired,
  input: PropTypes.shape({
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired
  }).isRequired,
  instructions: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    error: PropTypes.string
  }).isRequired,
  submitHandler: PropTypes.func.isRequired
};

const UsernameForm = (props) => {
  const {autoFocus, handleSubmit} = props;

  // TODO: Disable form submission if the entered username is the same as the username in the Redux store.

  return (
    <form onSubmit={handleSubmit}>
      <Header
        className="UsernameForm-Header"
        content="Heatmap your profile"
        size="huge"
      />
      <Field
        autoFocus={autoFocus}
        className="UsernameForm-Field_username"
        component={ReduxFormSUIInput}
        fluid
        iconName="search"
        instructions="Enter your Instagram username"
        name="username"
        placeholder="Enter your Instagram username"
        size="large"
        submitHandler={handleSubmit}
        type="text"
        validate={[
          usernameValidators.isNotEmpty,
          usernameValidators.hasValidFormat
        ]}
      />
    </form>
  );
};

UsernameForm.propTypes = {
  autoFocus: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired
};

export default UsernameForm;