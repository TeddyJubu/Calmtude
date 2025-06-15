
-- Create emotion_logs table to store user mood entries
CREATE TABLE public.emotion_logs (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  mood text NOT NULL,
  notes text,
  PRIMARY KEY (id)
);

-- Enable Row Level Security on the table
ALTER TABLE public.emotion_logs ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows users to view and manage their own emotion logs
CREATE POLICY "Users can manage their own emotion logs"
ON public.emotion_logs
FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Add a comment to the table for clarity
COMMENT ON TABLE public.emotion_logs IS 'Stores user emotion log entries.';
