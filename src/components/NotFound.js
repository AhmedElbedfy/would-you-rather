import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="not-found">
            <p>
                Page Not Found, Code 404.
            <br />
            Go to <Link to="/" className="link"> Home Page</Link>
            </p>
        </div>
    );
}
