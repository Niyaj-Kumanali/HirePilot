export default interface Job {
  id: number
  title: string
  company: string
  location: string
  salary: string
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship'| 'Temporary' | 'Remote' | 'Hybrid' | 'On-site' | 'Volunteer' 
  level: 'Entry' | 'Mid' | 'Senior'
  description: string
  tags: string[]
  rating: number
  posted: string
  saved: boolean
  applicants?: number
}
