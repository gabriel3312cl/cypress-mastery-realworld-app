import React from 'react';
import styles from "../../Form.module.css";

function FormButton({
    text,
    testid,

}) {
    return (
        <div className={styles.formActions}>
            <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                data-testid={testid}
            >
                {text}
            </button>
        </div>
    )
}

export default FormButton;
