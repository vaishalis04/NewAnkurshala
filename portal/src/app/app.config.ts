import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, errorHandlingInterceptor } from './http.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(
    withInterceptors([
      authInterceptor, errorHandlingInterceptor
    ])
  )],
};

export const roleWiseAccess = [
  {
    label: 'Dashboard Page',
    PERMISSION_CODE: 'DASHBOARD_VIEW',
    page: 'dashboard'
  },
  {
    label: 'Role Management Page',
    PERMISSION_CODE: 'ROLES_VIEW',
    page: 'roles'
  },
  {
    label: 'Add Role',
    PERMISSION_CODE: 'ROLES_ADD'
  },
  {
    label: 'Edit Role',
    PERMISSION_CODE: 'ROLES_EDIT'
  },
  {
    label: 'Delete Role',
    PERMISSION_CODE: 'ROLES_DELETE'
  },
  {
    label: 'User Management Page',
    PERMISSION_CODE: 'USERS_VIEW',
    page: 'users'
  },
  {
    label: 'Add User',
    PERMISSION_CODE: 'USERS_ADD'
  },
  {
    label: 'Edit User',
    PERMISSION_CODE: 'USERS_EDIT'
  },
  {
    label: 'Delete User',
    PERMISSION_CODE: 'USERS_DELETE'
  },
  {
    label: 'Browse Classes Page',
    PERMISSION_CODE: 'BROWSE_CLASSES_VIEW',
    page: 'browse-classes'
  },
  {
    label: 'Class Details Page',
    PERMISSION_CODE: 'CLASS_DETAILS_VIEW',
    page: 'class-details'
  },
  {
    label: 'Profile Page',
    PERMISSION_CODE: 'PROFILE_VIEW',
    page: 'profile'
  },
  {
    label: 'Settings Page',
    PERMISSION_CODE: 'SETTINGS_VIEW',
    page: 'settings'
  },
  {
    label: 'class Management Page',
    PERMISSION_CODE: 'CLASS_VIEW',
    page: 'addClass'
  },
  {
    label: 'Add Class',
    PERMISSION_CODE: 'CLASS_ADD'
  },
  {
    label: 'Edit Class',
    PERMISSION_CODE: 'CLASS_EDIT'
  },
  {
    label: 'Delete Class',
    PERMISSION_CODE: 'CLASS_DELETE'
  },
  {
    label: 'Subject Management Page',
    PERMISSION_CODE: 'SUBJECT_VIEW',
    page: 'addSubject'
  },
  {
    label: 'Add Subject',
    PERMISSION_CODE: 'SUBJECT_ADD'
  },
  {
    label: 'Edit Subject',
    PERMISSION_CODE: 'SUBJECT_EDIT'
  },
  {
    label: 'Delete Subject',
    PERMISSION_CODE: 'SUBJECT_DELETE'
  },
  {
    label: 'Topic Management Page',
    PERMISSION_CODE: 'TOPIC_VIEW',
    page: 'addTopic'
  },
  {
    label: 'Add Topic',
    PERMISSION_CODE: 'TOPIC_ADD'
  },
  {
    label: 'Edit Topic',
    PERMISSION_CODE: 'TOPIC_EDIT'
  },
  {
    label: 'Delete Topic',
    PERMISSION_CODE: 'TOPIC_DELETE'
  },
]
