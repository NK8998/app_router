# Custom Client-Side Router

## Overview
This custom client-side router for your web app provides a powerful and flexible way to handle navigation, dynamic routes, nested routes, and persistent components. It enhances user experience by executing actions before route transitions and reducing layout shifts.

## Features

1. **Dynamic and Static Route Matching**
   - Uses `/` notation for static routes.
   - Uses `/:` notation for dynamic routes.
   
2. **Preloading Actions for Smoother Navigation**
   - Actions are executed before moving to a new route, allowing data fetching or processing before the component renders.
   - Helps in reducing layout shifts by ensuring the required data is available before rendering.
   
3. **Component Persistence**
   - Components are visually hidden instead of unmounted, preserving state and reducing re-renders.
   - This feature can be disabled if needed, allowing routes to fully unmount when navigated away from.

4. **Useful APIs**
   - `useParams`: Access dynamic route parameters.
   - `useNavigate`: Programmatically navigate between routes.
   - `useRouteProperties`: Access additional route metadata and properties.

5. **Nested Routing Support**
   - Routes can be nested indefinitely.
   - Uses an `<Outlet />` component to render nested routes dynamically.

## Example Usage

### Declaring Routes
```tsx
<AppRouter>
  <Route element={<Home />} path='/' action={() => dispatch(fetchFeed())} />
  <Route
    element={<Watch />}
    path='/watch'
    action={() => dispatch(fetchSelectedVideo())}
    visited
  />
  <Route
    element={<Channel />}
    path='/channel/:channel'
    action={() => dispatch(fetchChannelContent())}
  >
    <Route element={<ChannelFeaturedPage />} path='/featured' />
    <Route element={<ChannelVideosPage />} path='/videos' />
    <Route element={<ChannelLiveVideosPage />} path='/live' />
  </Route>
  <Route element={<UserHistoryPage />} path='/feed/history' />
</AppRouter>
```

### Enabling Component Persistence
```tsx
export default function ClientApp() {
  return (
      <AppRouterProvider persist>
        <Main />
      </AppRouterProvider>
  );
}
```

## Upcoming Features
- **404 Page**: Render a custom 404 page when no routes match.
- **Fallback Route**: Define a default fallback route if no specific matches are found.
- **Error Handling**: Show an error page when an action fails.

---

This router is designed to provide a seamless user experience, ensuring data is ready before transitions and reducing unnecessary layout shifts. Currently there's a bit too many rerenders. Working on fixing this😁.

