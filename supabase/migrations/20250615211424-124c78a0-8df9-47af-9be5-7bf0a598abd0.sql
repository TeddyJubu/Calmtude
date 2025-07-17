
-- Create a table for mindful observations
CREATE TABLE public.mindful_observations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  observation TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT mindful_observations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE
);

-- Add Row Level Security (RLS) to ensure users can only interact with their own observations
ALTER TABLE public.mindful_observations ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own observations
CREATE POLICY "Users can view their own mindful observations"
  ON public.mindful_observations
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own observations
CREATE POLICY "Users can create their own mindful observations"
  ON public.mindful_observations
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own observations
CREATE POLICY "Users can update their own mindful observations"
  ON public.mindful_observations
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own observations
CREATE POLICY "Users can delete their own mindful observations"
  ON public.mindful_observations
  FOR DELETE
  USING (auth.uid() = user_id);
