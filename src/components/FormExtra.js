import React from 'react';
import { Link } from 'react-router-dom';

export default function FormExtra() {
    return (
        <div className="flex items-center justify-between ">
            <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-purple-600 hover:text-purple-500">
                    Forgot your password?
                </Link>
            </div>
        </div>
    );
}
