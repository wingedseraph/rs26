import { App, STORAGE } from "@/App";
import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";



describe('render app', () => {
  afterEach(() => localStorage.clear())
  it('should render card with msw mocked data', async () => {
    render(<App />)

    await screen.findByText('Pastoral landscape')
    await screen.findByRole("img")
  })

  it('should get data from localStorage', async () => {
    const query = 'Paris'
    localStorage.setItem(STORAGE, query)

    render(<App />)

    const input = await screen.findByRole<HTMLInputElement>('textbox')

    expect(input.value).toBe(query)
  })
  it('should set data to localStorage on submit', async () => {
    const query = 'Not Paris'
    render(<App />)

    const input = await screen.findByRole<HTMLInputElement>('textbox')
    await waitFor(() => expect(input.disabled).toBeFalsy())
    await userEvent.type(input, query)
    await userEvent.type(input, '{Enter}')

    await waitFor(() => expect(localStorage.getItem(STORAGE)).toBe(query))
  })
})
