import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import nock from 'nock'

import { CartSidebar } from '@/containers/cart-sidebar'
import { useRemoveItemFromCart } from '@/hooks/use-remove-item-from-cart'
import { useUpdateItemInCart } from '@/hooks/use-update-item-in-cart'
import { PRODUCTS } from '@/mocks/products'
import { renderWithProviders } from '@/tests/test-utils'

jest.mock('@/hooks/use-remove-item-from-cart')
jest.mock('@/hooks/use-update-item-in-cart')

describe('<CartSidebar />', () => {
  afterEach(() => {
    nock.cleanAll()
    jest.clearAllMocks()
  })

  beforeEach(() => {
    ;(useUpdateItemInCart as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    })
    ;(useRemoveItemFromCart as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
    })
  })

  describe('when user has cart items', () => {
    beforeEach(() => {
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
    })

    it('renders correct cart items', async () => {
      renderWithProviders(<CartSidebar />)

      await waitFor(() => {
        expect(screen.getByTestId(/cart-item-quantity/)).toHaveValue(5)
        expect(screen.getByText('Jeans')).toBeInTheDocument()
      })
    })

    it('renders correct totals', async () => {
      renderWithProviders(<CartSidebar />)

      await waitFor(() => {
        expect(
          screen.getByText('Buy 3, pay 2 (Recommended)')
        ).toBeInTheDocument()
        expect(screen.getByText(/180.00/)).toBeInTheDocument()
        expect(screen.queryByText(/190.00/)).not.toBeInTheDocument()
      })
    })

    it('renders correct checkbox state', async () => {
      renderWithProviders(<CartSidebar />)

      await waitFor(() => {
        expect(screen.getByLabelText(/Buy 3, pay 2/)).toBeChecked()
        expect(screen.getByLabelText(/VIP Discount/)).not.toBeChecked()
      })
    })
  })

  describe('when user has only 2 cart items', () => {
    beforeEach(() => {
      nock('http://localhost/api')
        .get('/cart')
        .reply(200, [
          {
            Product: PRODUCTS.JEANS,
            id: 'Test',
            quantity: 2,
            productId: 'Jeans',
          },
        ])

      nock('http://localhost/api').get('/cart/total').reply(200, {
        total: '131.00',
        vipDiscountTotal: '111.35',
        threeForTwoTotal: '200.00',
        recommendation: 'vip',
      })
    })

    it('renders correct cart items', async () => {
      renderWithProviders(<CartSidebar />)

      await waitFor(() => {
        expect(screen.getByTestId(/cart-item-quantity/)).toHaveValue(2)
        expect(screen.getByText('Jeans')).toBeInTheDocument()
      })
    })

    it('renders correct totals', async () => {
      renderWithProviders(<CartSidebar />)

      await waitFor(() => {
        expect(
          screen.getByText('VIP Discount (Recommended)')
        ).toBeInTheDocument()
        expect(screen.getByTestId(/total-value/)).toHaveTextContent('$131.00')
        expect(screen.getByTestId(/final-value/)).toHaveTextContent('$111.35')
        expect(screen.queryByText(/200.00/)).not.toBeInTheDocument()
      })
    })

    it('renders correct checkbox state', async () => {
      renderWithProviders(<CartSidebar />)

      await waitFor(() => {
        expect(screen.getByLabelText(/Buy 3, pay 2/)).not.toBeChecked()
        expect(screen.getByLabelText(/VIP Discount/)).toBeChecked()
      })
    })
  })

  describe('when user clicks in a different discount type', () => {
    beforeEach(() => {
      nock('http://localhost/api')
        .get('/cart')
        .reply(200, [
          {
            Product: PRODUCTS.JEANS,
            id: 'Test',
            quantity: 2,
            productId: 'Jeans',
          },
        ])

      nock('http://localhost/api').get('/cart/total').reply(200, {
        total: '131.00',
        vipDiscountTotal: '111.35',
        threeForTwoTotal: '200.00',
        recommendation: 'vip',
      })
    })

    it('changes total values', async () => {
      renderWithProviders(<CartSidebar />)

      await waitFor(() => {
        expect(screen.getByTestId(/total-value/)).toHaveTextContent('$131.00')
        expect(screen.getByTestId(/final-value/)).toHaveTextContent('$111.35')
      })

      act(() => {
        screen.getByLabelText(/Buy 3, pay 2/).click()
      })

      await waitFor(() => {
        expect(screen.getByTestId(/total-value/)).toHaveTextContent('$131.00')
        expect(screen.getByTestId(/final-value/)).toHaveTextContent('$200.00')
      })
    })
  })

  describe('when user changes cart item quantity', () => {
    beforeEach(() => {
      nock('http://localhost/api')
        .get('/cart')
        .reply(200, [
          {
            Product: PRODUCTS.JEANS,
            id: 'Test',
            quantity: 2,
            productId: 'Jeans',
          },
        ])

      nock('http://localhost/api').get('/cart/total').reply(200, {
        total: '131.00',
        vipDiscountTotal: '111.35',
        threeForTwoTotal: '200.00',
        recommendation: 'vip',
      })
    })

    it('changes total values', async () => {
      ;(useUpdateItemInCart as jest.Mock).mockReturnValue({
        mutate: jest.fn(),
      })
      ;(useRemoveItemFromCart as jest.Mock).mockReturnValue({
        mutate: jest.fn(),
      })

      renderWithProviders(<CartSidebar />)

      await waitFor(() => {
        const input = screen.getByTestId(/cart-item-quantity/)

        fireEvent.change(input, { target: { value: '3' } })
        fireEvent.blur(input)
      })

      await waitFor(() => {
        expect(
          useUpdateItemInCart({ productId: 'test' }).mutate
        ).toHaveBeenCalledTimes(1)
        expect(
          useUpdateItemInCart({ productId: 'test' }).mutate
        ).toHaveBeenCalledWith(3)
      })
    })
  })
})
