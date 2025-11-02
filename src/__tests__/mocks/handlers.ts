import { http, HttpResponse } from 'msw';

export const handlers = [
  // Mock Salesforce API responses
  http.post('/api/rfp', () => {
    return HttpResponse.json({
      success: true,
      message: 'RFP application submitted successfully',
      applicationId: 'mock-rfp-id-123',
      csatToken: 'mock-csat-token-456'
    });
  }),

  http.post('/api/wishlist', () => {
    return HttpResponse.json({
      success: true,
      message: 'Wishlist application submitted successfully',
      applicationId: 'mock-wishlist-id-123',
      csatToken: 'mock-csat-token-456'
    });
  }),

  http.post('/api/direct-grant', () => {
    return HttpResponse.json({
      success: true,
      message: 'Direct grant application submitted successfully',
      applicationId: 'mock-direct-grant-id-123',
      csatToken: 'mock-csat-token-456'
    });
  }),

  http.post('/api/office-hours', () => {
    return HttpResponse.json({
      success: true,
      message: 'Office Hours application submitted successfully',
      applicationId: 'mock-office-hours-id-123',
      csatToken: 'mock-csat-token-456'
    });
  })
];
