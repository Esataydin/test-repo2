import { BsCloudDownloadFill } from 'react-icons/bs';
export const PROFILE_MENU_ITEMS = [{
  key: 'profile-feed',
  label: 'Feed',
  url: '/profile/feed',
  parentKey: 'pages-profile'
}, {
  key: 'profile-about',
  label: 'About',
  url: '/profile/about',
  parentKey: 'pages-profile'
}, {
  key: 'profile-connections',
  label: 'Connections',
  url: '/profile/connections',
  badge: {
    text: '300',
    variant: 'success'
  },
  parentKey: 'pages-profile'
}, {
  key: 'profile-media',
  label: 'Media',
  url: '/profile/media',
  parentKey: 'pages-profile'
}, {
  key: 'profile-videos',
  label: 'Videos',
  url: '/profile/videos',
  parentKey: 'pages-profile'
}, {
  key: 'profile-events',
  label: 'Events',
  url: '/profile/events',
  parentKey: 'pages-profile'
}, {
  key: 'profile-activity',
  label: 'Activity',
  url: '/profile/activity',
  parentKey: 'pages-profile'
}];
export const APP_MENU_ITEMS = [ {
  key: 'accounts',
  label: 'Account',
  isTitle: true,
  children: [{
    key: 'acc-create-a-page',
    label: 'Create a page',
    url: '/feed/create-page',
    parentKey: 'accounts'
  }, {
    key: 'acc-settings',
    label: 'Settings',
    url: '/settings/account',
    parentKey: 'accounts'
  }, {
    key: 'acc-notifications',
    label: 'Notifications',
    url: '/notifications',
    parentKey: 'accounts'
  }, {
    key: 'acc-help-center',
    label: 'Help Center',
    url: '/help',
    parentKey: 'accounts'
  }, {
    key: 'acc-help-details',
    label: 'Help Details',
    url: '/help/details',
    parentKey: 'accounts'
  }, {
    key: 'acc-authentication',
    label: 'Authentication',
    parentKey: 'accounts',
    children: [{
      key: 'auth-sign-in',
      label: 'Sign In',
      url: '/auth/sign-in',
      parentKey: 'acc-authentication'
    }, {
      key: 'auth-sign-up',
      label: 'Sign Up',
      url: '/auth/sign-up',
      parentKey: 'acc-authentication'
    }, {
      key: 'auth-forgot-pass',
      label: 'Forgot Password',
      url: '/auth/forgot-pass',
      parentKey: 'acc-authentication'
    }, {
      key: 'auth-divider-1',
      isDivider: true
    }, {
      key: 'auth-sign-in-advance',
      label: 'Sign In Advance',
      url: '/auth-advance/sign-in',
      parentKey: 'acc-authentication'
    }, {
      key: 'auth-sign-up-advance',
      label: 'Sign Up Advance',
      url: '/auth-advance/sign-up',
      parentKey: 'acc-authentication'
    }, {
      key: 'auth-forgot-pass-advance',
      label: 'Forgot Password Advance',
      url: '/auth-advance/forgot-pass',
      parentKey: 'acc-authentication'
    }]
  }, {
    key: 'acc-error-404',
    label: 'Error 404',
    url: '/not-found',
    parentKey: 'accounts'
  }, {
    key: 'acc-offline',
    label: 'Offline',
    url: '/offline',
    parentKey: 'accounts'
  }, {
    key: 'acc-privacy-&-terms',
    label: 'Privacy & Terms',
    url: '/privacy-terms',
    parentKey: 'accounts'
  }]
}, {
  key: 'my-network',
  isTitle: true,
  label: 'My Network',
  url: '/profile/connections'
}];