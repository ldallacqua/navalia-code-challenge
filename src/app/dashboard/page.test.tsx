import { waitFor } from '@testing-library/dom'
import { useRouter } from 'next/navigation'
import nock from 'nock'

import Dashboard from '@/app/dashboard/page'
import { renderWithProviders } from '@/tests/test-utils'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

it('redirects to login if user is not logged in', async () => {
  ;(useRouter as jest.Mock).mockReturnValue({
    replace: jest.fn(),
  })

  nock('http://localhost/api').get('/products').reply(200, [])
  nock('http://localhost/api').get('/cart').reply(200, [])

  renderWithProviders(<Dashboard />)

  await waitFor(() => {
    expect(useRouter().replace).toHaveBeenCalledWith('/')
  })
})
