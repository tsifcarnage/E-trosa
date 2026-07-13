import type { User } from "@supabase/supabase-js";

export interface IProfile {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
}

export interface IProfileInfoFormProps {
  editForm: { first_name: string; last_name: string };
  setEditForm: (
    fn: (prev: { first_name: string; last_name: string }) => {
      first_name: string;
      last_name: string;
    },
  ) => void;
  email: string;
  setEmail: (email: string) => void;
  profileMsg: string | null;
  loadingProfile: boolean;
  onSubmit: (e: React.SubmitEvent) => void;
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
  onSubmit: (e: React.SubmitEvent) => void;
}

export interface IProfileCardProps {
  avatarPreview: string | null;
  firstName: string;
  lastName: string;
  email: string;
  avatarFile: File | null;
  loadingProfile: boolean;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveAvatar: () => void;
}

export interface IProfileStatsProps {
  user: User;
  onLogout: () => void;
}
