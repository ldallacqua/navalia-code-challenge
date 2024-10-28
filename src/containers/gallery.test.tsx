import { screen, waitFor } from '@testing-library/react'
import nock from 'nock'

import { Gallery } from '@/containers/gallery'
import { useAddItemToCart } from '@/hooks/use-add-item-to-cart'
import { PRODUCTS } from '@/mocks/products'
import { renderWithProviders } from '@/tests/test-utils'

jest.mock('@/hooks/use-add-item-to-cart')

describe('<Gallery />', () => {
  afterEach(() => {
    nock.cleanAll()
    jest.clearAllMocks()
  })

  beforeEach(() => {
    ;(useAddItemToCart as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    })
  })

  describe('when there are products', () => {
    beforeEach(() => {
      nock('http://localhost/api')
        .get('/products')
        .reply(200, [PRODUCTS.JEANS, PRODUCTS.DRESS, PRODUCTS.SHIRT])
    })

    it('renders products', async () => {
      renderWithProviders(<Gallery />)

      await waitFor(() => {
        expect(screen.getByText('Jeans')).toBeInTheDocument()
        expect(screen.getByText('T-shirt')).toBeInTheDocument()
        expect(screen.getByText('Dress')).toBeInTheDocument()
      })
    })

    it('renders products descriptions', async () => {
      renderWithProviders(<Gallery />)

      await waitFor(() => {
        expect(screen.getByText(/a simple jeans/i)).toBeInTheDocument()
        expect(screen.getByText(/a simple t-shirt/i)).toBeInTheDocument()
        expect(screen.getByText(/a simple dress/i)).toBeInTheDocument()
      })
    })
  })

  describe('when user clicks add to cart button', () => {
    beforeEach(() => {
      nock('http://localhost/api').get('/products').reply(200, [PRODUCTS.JEANS])
    })

    it('calls mutate with correct arguments', async () => {
      renderWithProviders(<Gallery />)

      await waitFor(() => {
        screen.getByRole('button', { name: /add to cart/i }).click()
      })

      expect(useAddItemToCart().mutate).toHaveBeenCalledTimes(1)
      expect(useAddItemToCart().mutate).toHaveBeenCalledWith({
        productId: 'JEANS',
        quantity: 1,
      })
    })
  })
})
