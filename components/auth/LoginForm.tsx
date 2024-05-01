import {Card, CardContent, CardHeader} from '@/components/ui/card'
import { CardWrapper } from './card-wrapper'

export const LoginForm = () => {
  return (
   <CardWrapper
    headerLabel='Welcome Back'
    backButtonLabel="Don't have an account?"
    backButtonHref='/register'
    showSocial
   >
    Login FOrm
   </CardWrapper>
  )
}


