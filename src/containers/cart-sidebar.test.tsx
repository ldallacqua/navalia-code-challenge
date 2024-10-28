import { screen, waitFor } from '@testing-library/react'
import nock from 'nock'

import { CartSidebar } from '@/containers/cart-sidebar'
import { PRODUCTS } from '@/mocks/products'
import { renderWithProviders } from '@/tests/test-utils'

describe('<AppSidebar />', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('when user has cart items', () => {
    it('renders correct cart items', async () => {
      nock('http://localhost/api')
        .get('/cart')
        .reply(200, [
          {
            Product: PRODUCTS.JEANS,
            id: 'Test',
            quantity: 5,
            productId: 'Jeans',
          },
        ])

      nock('http://localhost/api')
        .get('/cart/total')
        .reply(200, [
          {
            total: '200.00',
            vipDiscountTotal: '190.00',
            threeForTwoTotal: '180.00',
            recommendation: '3for2',
          },
        ])

      renderWithProviders(<CartSidebar />)

      await waitFor(() => {
        expect(screen.getByText('Jeans')).toBeInTheDocument()
      })
    })

    it('renders correct totals', async () => {
      nock('http://localhost/api')
        .get('/cart')
        .reply(200, [
          {
            Product: PRODUCTS.JEANS,
            id: 'Test',
            quantity: 5,
            productId: 'Jeans',
          },
        ])

      nock('http://localhost/api').get('/cart/total').reply(200, {
        total: '200.00',
        vipDiscountTotal: '190.00',
        threeForTwoTotal: '180.00',
        recommendation: '3for2',
      })

      renderWithProviders(<CartSidebar />)

      await waitFor(() => {
        expect(
          screen.getByText('Buy 3, pay 2 (Recommended)')
        ).toBeInTheDocument()
      })
    })
  })
})
