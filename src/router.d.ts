import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    path?: string;
    sideClass?: string;
    isPublic?: boolean;
  }
}