export interface IProfile {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
}

export interface IProfileInfoFormProps {
    editForm: { first_name: string; last_name: string };
    setEditForm: (fn: (prev: { first_name: string; last_name: string }) => { first_name: string; last_name: string }) => void;
    email: string;
    setEmail: (email: string) => void;
    profileMsg: string | null;
    loadingProfile: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

export interface IPasswordFormProps {
    currentPassword: string;
    setCurrentPassword: (v: string) => void;
    newPassword: string;
    setNewPassword: (v: string) => void;
    confirmPassword: string;
    setConfirmPassword: (v: string) => void;
    showPassword: boolean;
    setShowPassword: (v: boolean) => void;
    passwordMsg: string | null;
    loadingPassword: boolean;
    onSubmit: (e: React.FormEvent) => void;
}