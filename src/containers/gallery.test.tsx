import { screen, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import nock from 'nock'

import { Gallery } from '@/containers/gallery'
import { PRODUCTS } from '@/mocks/products'
import { renderWithProviders } from '@/tests/test-utils'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('<Gallery />', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('renders products', async () => {
    ;(useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn(),
    })

    nock('http://localhost/api')
      .get('/products')
      .reply(200, [PRODUCTS.JEANS, PRODUCTS.DRESS, PRODUCTS.SHIRT])

    renderWithProviders(<Gallery />)

    await waitFor(() => {
      expect(screen.getByText('Jeans')).toBeInTheDocument()
      expect(screen.getByText('T-shirt')).toBeInTheDocument()
      expect(screen.getByText('Dress')).toBeInTheDocument()
    })
  })
})
