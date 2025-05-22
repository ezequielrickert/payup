import React from 'react';
import { ChevronLeft, User } from 'lucide-react';

interface HeaderProps {
    title: string;
    showBack?: boolean;
    showUser?: boolean;
    onBack?: () => void;
    onUserClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
                                                  title,
                                                  showBack = false,
                                                  showUser = false,
                                                  onBack,
                                                  onUserClick
                                              }) => {
    return (
        <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                    {showBack && (
                        <button
                            onClick={onBack}
                            className="mr-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    )}
                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                </div>

                {showUser && (
                    <button
                        onClick={onUserClick}
                        className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
                    >
                        <User className="w-6 h-6" />
                    </button>
                )}
            </div>
        </div>
    );
};