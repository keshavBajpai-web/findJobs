
import React from 'react'
import { MoreHorizontal, Pencil, MapPin, Globe } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'
import useGetAdminCompanies from '../hook/useGetAdminCompanies'
import { useNavigate } from 'react-router'

const companies = [
  {
    id: 1,
    name: 'Google',
    location: 'Bangalore, India',
    website: 'google.com',
    jobs: 12,
    initials: 'G',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    id: 2,
    name: 'Microsoft',
    location: 'Hyderabad, India',
    website: 'microsoft.com',
    jobs: 8,
    initials: 'M',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    id: 3,
    name: 'Amazon',
    location: 'Delhi NCR, India',
    website: 'amazon.com',
    jobs: 15,
    initials: 'A',
    color: 'bg-yellow-100 text-yellow-700',
  },
  {
    id: 4,
    name: 'Infosys',
    location: 'Pune, India',
    website: 'infosys.com',
    jobs: 6,
    initials: 'I',
    color: 'bg-indigo-100 text-indigo-600',
  },
  {
    id: 5,
    name: 'Flipkart',
    location: 'Bangalore, India',
    website: 'flipkart.com',
    jobs: 10,
    initials: 'F',
    color: 'bg-blue-100 text-blue-700',
  },
]

const CompaniesTable = () => {
  useGetAdminCompanies()
  const { adminCompany } = useSelector((store) => store.company)
  // console.log(adminCompany);

  const navigate = useNavigate()

  return (
    <>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {adminCompany?.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>
                  {company.companyName}
                </TableCell>
                <TableCell>
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/admin/editCompany/${company._id}`)} >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
            }
          </TableBody>

        </Table>
      </div>
    </>
  )
}

export default CompaniesTable
