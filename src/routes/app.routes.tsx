import { Route, DefaultGenerics } from '@tanstack/react-location'

import { routes as openRoutes } from './open.routes'
import { routes as protectedRoutes } from './protected.routes'

export const routes: Route<DefaultGenerics>[] = [...openRoutes, ...protectedRoutes]
