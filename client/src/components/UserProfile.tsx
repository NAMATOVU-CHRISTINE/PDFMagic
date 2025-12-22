import React from 'react';
import { User, Settings, LogOut } from 'lucide-react';

interface UserProfileProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="flex items-center space-x-2">
        <button className="text-gray-700 hover:text-gray-900 font-medium">Login</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium">
          Sign up
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
        ) : (
          <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        )}
        <span className="text-sm font-medium">{user.name}</span>
      </button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <div className="px-4 py-3 border-b">
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        <button className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50">
          <Settings className="h-4 w-4" />
          <span className="text-sm">Settings</span>
        </button>
        <button className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 rounded-b-lg">
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserProfile;