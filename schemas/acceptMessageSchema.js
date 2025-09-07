import { z } from 'zod';

export const AcceptMessageSchema = {
  acceptMessage: {
    type: 'boolean',
    required: true
  }
}