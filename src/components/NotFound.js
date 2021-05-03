import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="not-found">
            <p>
                Page Not Found, Code 404.
            <br />
            Please <Link to="login" className="link"> Sign In</Link>
            </p>
        </div>
    );
}
