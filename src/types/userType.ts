export type EndorsementErrorResponseType = {
  error: string;
};

export type EndorsementResponseType = {
  success: boolean;
  message: string;
  data: EndorsementType[];
};

export type EndorsementType = {
  id: number;
  user_id: string;
  content: string;
  created_at: string;
  endorsed_by_name: string;
  endorsed_by_phone: string;
  is_published: boolean;
};

export type PostMessageResponseType = {
  success?: boolean;
  error?: string;
};
