import React from "react";

const Languages = ({ handleInputChange }) => {
  const selectLanguage = (e) => {
    handleInputChange(e);
  };

  return (
    <div className="language-dropdown">
      <span className="language-choice-para">
        Choose a language to translate:{" "}
      </span>
      <select
        className="language-select-tag"
        onChange={selectLanguage}
        data-placeholder="Choose a Language..."
      >
        <option name="language" value="Afrikaans">
          Afrikaans
        </option>
        <option name="language" value="Albanian">
          Albanian
        </option>
        <option name="language" value="Arabic">
          Arabic
        </option>
        <option name="language" value="Armenian">
          Armenian
        </option>
        <option name="language" value="Basque">
          Basque
        </option>
        <option name="language" value="Bengali">
          Bengali
        </option>
        <option name="language" value="Bulgarian">
          Bulgarian
        </option>
        <option name="language" value="Catalan">
          Catalan
        </option>
        <option name="language" value="Cambodian">
          Cambodian
        </option>
        <option name="language" value="Chinese (Mandarin)">
          Chinese (Mandarin)
        </option>
        <option name="language" value="Croatian">
          Croatian
        </option>
        <option name="language" value="Czech">
          Czech
        </option>
        <option name="language" value="Danish">
          Danish
        </option>
        <option name="language" value="Dutch">
          Dutch
        </option>
        <option name="language" value="English">
          English
        </option>
        <option name="language" value="Estonian">
          Estonian
        </option>
        <option name="language" value="Fiji">
          Fiji
        </option>
        <option name="language" value="Finnish">
          Finnish
        </option>
        <option name="language" value="French">
          French
        </option>
        <option name="language" value="Georgian">
          Georgian
        </option>
        <option name="language" value="German">
          German
        </option>
        <option name="language" value="Greek">
          Greek
        </option>
        <option name="language" value="Gujarati">
          Gujarati
        </option>
        <option name="language" value="Hebrew">
          Hebrew
        </option>
        <option name="language" value="Hindi">
          Hindi
        </option>
        <option name="language" value="Hungarian">
          Hungarian
        </option>
        <option name="language" value="Icelandic">
          Icelandic
        </option>
        <option name="language" value="Indonesian">
          Indonesian
        </option>
        <option name="language" value="Irish">
          Irish
        </option>
        <option name="language" value="Italian">
          Italian
        </option>
        <option name="language" value="Japanese">
          Japanese
        </option>
        <option name="language" value="Javanese">
          Javanese
        </option>
        <option name="language" value="Korean">
          Korean
        </option>
        <option name="language" value="Latin">
          Latin
        </option>
        <option name="language" value="Latvian">
          Latvian
        </option>
        <option name="language" value="Lithuanian">
          Lithuanian
        </option>
        <option name="language" value="Macedonian">
          Macedonian
        </option>
        <option name="language" value="Malay">
          Malay
        </option>
        <option name="language" value="Malayalam">
          Malayalam
        </option>
        <option name="language" value="Maltese">
          Maltese
        </option>
        <option name="language" value="Maori">
          Maori
        </option>
        <option name="language" value="Marathi">
          Marathi
        </option>
        <option name="language" value="Mongolian">
          Mongolian
        </option>
        <option name="language" value="Nepali">
          Nepali
        </option>
        <option name="language" value="Norwegian">
          Norwegian
        </option>
        <option name="language" value="Persian">
          Persian
        </option>
        <option name="language" value="Polish">
          Polish
        </option>
        <option name="language" value="Portuguese">
          Portuguese
        </option>
        <option name="language" value="Punjabi">
          Punjabi
        </option>
        <option name="language" value="Quechua">
          Quechua
        </option>
        <option name="language" value="Romanian">
          Romanian
        </option>
        <option name="language" value="Russian">
          Russian
        </option>
        <option name="language" value="Samoan">
          Samoan
        </option>
        <option name="language" value="Serbian">
          Serbian
        </option>
        <option name="language" value="Slovak">
          Slovak
        </option>
        <option name="language" value="Slovenian">
          Slovenian
        </option>
        <option name="language" value="Spanish">
          Spanish
        </option>
        <option name="language" value="Swahili">
          Swahili
        </option>
        <option name="language" value="Swedish ">
          Swedish{" "}
        </option>
        <option name="language" value="Tamil">
          Tamil
        </option>
        <option name="language" value="Tatar">
          Tatar
        </option>
        <option name="language" value="Telugu">
          Telugu
        </option>
        <option name="language" value="Thai">
          Thai
        </option>
        <option name="language" value="Tibetan">
          Tibetan
        </option>
        <option name="language" value="Tonga">
          Tonga
        </option>
        <option name="language" value="Turkish">
          Turkish
        </option>
        <option name="language" value="Ukrainian">
          Ukrainian
        </option>
        <option name="language" value="Urdu">
          Urdu
        </option>
          <option name="language" value="Tagalog">
          Tagalog
        </option>
        <option name="language" value="Uzbek">
          Uzbek
        </option>
        <option name="language" value="Vietnamese">
          Vietnamese
        </option>
        <option name="language" value="Welsh">
          Welsh
        </option>
        <option name="language" value="Xhosa">
          Xhosa
        </option>
      </select>
    </div>
  );
};

export default Languages;
