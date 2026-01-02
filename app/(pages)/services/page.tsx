import ServiceClient from '@/components/service/ServiceClient'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web development, mobile apps, full-stack solutions, API development, AI integration, and mentorship services.",
};

const ServicePage = async() => {
  return (
    <div>
        <ServiceClient/>
    </div>
  )
}

export default ServicePage