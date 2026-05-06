/**
 * Mock loyalty/wallet fixtures — mirrors uEngage Prism API responses.
 */

export const mockWalletResponse = {
  user_id: 'user-mock-001',
  wallet_balance: 1250,   // $12.50 in wallet credits
  reward_points: 340,
  tier: 'Gold',
};

export const mockRedemptionValidation = {
  max_redeemable: 500,    // Prism caps at $5.00 on this order
  equivalent_discount: 500,
};

export const mockRedeemResponse = {
  success: true,
  new_balance: 750,
};

export const mockOtpRequestResponse = {
  session_token: 'mock-session-token-abc123',
};

export const mockOtpVerifyResponse = {
  user_id: 'user-mock-001',
  name: 'Alex Chen',
  phone: '+15551234567',
  email: 'alex@example.com',
  auth_token: 'mock-jwt-token-xyz789',
};
