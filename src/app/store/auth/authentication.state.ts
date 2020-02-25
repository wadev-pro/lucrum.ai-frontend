import { Profile } from 'app/shared/models/user.model';

export interface AuthenticationState {
  fetching: boolean;
  didFetch: boolean;
  processing: boolean;
  data: Profile;
}

export const initialState: AuthenticationState = {
  didFetch: false,
  fetching: false,
  processing: false,
  data: {
    authorization: '',
    id: 0,
    name: '',
    first_name: '',
    last_name: '',
    email: '',
    role: 0,
    email_verified_at: '',
    created_at: '',
    updated_at: '',
    stripe_id: '',
    card_brand: '',
    card_last_four: '',
    trial_ends_at: '',
  },
};
