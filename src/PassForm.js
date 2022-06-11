/* eslint-disable no-console */
import React, { useState } from 'react';
import getMePassPhrase from './getMePassPhrase';

function PassForm() {
  const [values, setValues] = useState({
    fieldType: 'text',
    generatedPassword: '',
    numWords: '3',
    minLength: '17',
    specialChars: '-',
    numbersInPass: 'Yes',
    replace: true,
    pwdLen: 0,
    error: false,
    crackTime: '',
  });

  const handleChange = (event) => {
    let { name, value, type } = event.target;

    if (name === 'replace' && type === 'checkbox') {
      value = !values.replace;
    }

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (values.specialChars.length > 0 && values.minLength <= 100) {
      setValues({ ...values });

      // Get the Passphrase depending upon the form values!
      const { pwd, len, crackTime } = getMePassPhrase(values);
      setValues({
        ...values,
        generatedPassword: pwd,
        pwdLen: len,
        error: false,
        crackTime,
      });
    } else {
      setValues({ ...values, error: true });
      alert('Invalid Values selected');
    }
  };
  const handleShow = (event) => {
    const { value } = event.target;
    setValues({ ...values, fieldType: value });
  };

  const handleCopy = () => {
    const copyText = document.getElementById('generatedPassword');

    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    document.execCommand('copy');

    alert(`Copied the Password`);
  };

  const toggleCopyButton = () => {
    if (values.pwdLen > 0) {
      if (values.fieldType === 'text') {
        return (
          <button
            className="btn"
            type="button"
            onClick={handleShow}
            value="password"
          >
            Hide
          </button>
        );
      }

      // Default Text Field!
      return (
        <button className="btn" type="button" onClick={handleShow} value="text">
          Show
        </button>
      );
    }
  };

  return (
    <div className='text-white'>
      <div className="PwdLength">
        {values.pwdLen === 0 ? (
          <h4>Click the generate button!</h4>
        ) : (
          <h5>
            Your Password is of{' '}
            <span className="crackTime">{values.pwdLen}</span> Charecter Length
            and can take <span className="crackTime">{values.crackTime}</span>{' '}
            to crack
          </h5>
        )}
      </div>
      <div>
        <form className="form-parent">
          {/* Password Field! */}
          <div className="form-child passwordField">
            <label htmlFor="generatedPassword">
              <input
                type={values.fieldType}
                value={values.generatedPassword}
                name="generatedPassword"
                id="generatedPassword"
                onChange={handleChange}
                size="70"
              />
              {toggleCopyButton()}
              {values.pwdLen > 0 && (
                <button className="btn" type="button" onClick={handleCopy}>
                  Copy
                </button>
              )}
            </label>
          </div>

          {/* Mininmum Number of Words */}
          <div className="form-child numWordsField">
            <label htmlFor="numWords">
              Number of Words
              <select
                name="numWords"
                id="numWords"
                onChange={handleChange}
                value={values.numWords}
              >
                {[3, 4, 5, 6, 7].map((item, index) => (
                  <option key={index} value={item}>
                    {' '}
                    {item}{' '}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* MinLength Field */}
          <div className="form-child minLengthField">
            <label htmlFor="minLength">
              Minimum Length
              <input
                type="Number"
                id="minLength"
                name="minLength"
                value={values.minLength}
                onChange={handleChange}
                max={100}
              />
              {values.minLength > 100 && (
                <>
                  <br />
                  <span className="error">
                    {' '}
                    Length Cannot be more than 100
                  </span>{' '}
                </>
              )}
            </label>
          </div>

          {/* SpecialChars Field */}
          <div className="form-child specialCharsField">
            <label htmlFor="specialChars">
              Special Charecters
              <input
                type="text"
                id="specialChars"
                name="specialChars"
                value={values.specialChars}
                onChange={handleChange}
                minLength="1"
                className="specialCharsInput"
              />
              {values.specialChars.length === 0 && (
                <>
                  <br />
                  <span className="error">
                    {' '}
                    You should enter atleast 1 Charecter
                  </span>{' '}
                </>
              )}
            </label>
          </div>

          {/* NumbersIn Section */}
          <div className="form-child numbersInPassField">
            Numbers?{' '}
            <label htmlFor="numInPassTrue">
              Yes
              <input
                type="radio"
                id="numInPassTrue"
                name="numbersInPass"
                value="Yes"
                checked={values.numbersInPass === 'Yes'}
                onChange={handleChange}
              />
            </label>
            <label htmlFor="numInPassFalse">
              No
              <input
                type="radio"
                name="numbersInPass"
                value="No"
                checked={values.numbersInPass === 'No'}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Replacer Section */}
          <div className="form-child replacerField">
            <label htmlFor="replacerId">
              Replace letters with numbers
              <input
                type="checkbox"
                id="replacerId"
                name="replace"
                value={values.replace}
                onChange={handleChange}
                defaultChecked
                className="mycheckbox"
              />
            </label>
          </div>
          <div className="btn-submit">
            <button className="btn " type="submit" onClick={handleSubmit}>
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PassForm;
