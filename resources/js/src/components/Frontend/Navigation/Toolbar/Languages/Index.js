import React from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

import './Languages.scss';

export default ({ languages, language, set }) => <UncontrolledDropdown className="Languages">
    <DropdownToggle caret>
        <div className="flag">
            <span className="language-flag">
                {/* <span className={`fas position-absolute fa-globe-africa text-secondary`} /> */}
                <span className={`flag-icon flag-icon-${language && language.flag.toLowerCase()}`} />
            </span>
        </div>

        <span className="name">{language && language.abbr}</span>
    </DropdownToggle>

    <DropdownMenu>
        {languages.map(l => <DropdownItem onClick={() => set(l.abbr)} key={JSON.stringify(l) + Math.random()}>
            <span className={`flag-icon flag-icon-${l.flag.toLowerCase()}`} />
            {l.name}
        </DropdownItem>)}
    </DropdownMenu>
</UncontrolledDropdown>;