-- Migration : création de la table email_analyses
-- À exécuter dans l'éditeur SQL de Supabase

-- Fonction pour updated_at automatique
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Table principale
CREATE TABLE public.email_analyses (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sender_name         TEXT NOT NULL,
  sender_email        TEXT NOT NULL,
  subject             TEXT NOT NULL,
  body                TEXT NOT NULL,
  category            TEXT NOT NULL CHECK (category IN ('complaint', 'sales_lead', 'technical_question')),
  subcategory         TEXT NOT NULL,
  confidence          NUMERIC(4,3) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  sentiment           TEXT NOT NULL CHECK (sentiment IN ('positive', 'neutral', 'negative')),
  urgency             TEXT NOT NULL CHECK (urgency IN ('low', 'medium', 'high')),
  entities            JSONB NOT NULL DEFAULT '{"products":[],"order_ids":[],"account_ids":[],"issues":[]}'::jsonb,
  key_points          TEXT[] NOT NULL DEFAULT '{}',
  draft_reply         TEXT NOT NULL DEFAULT '',
  draft_reply_edited  TEXT,
  processing_error    TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_email_analyses_user_created  ON public.email_analyses (user_id, created_at DESC);
CREATE INDEX idx_email_analyses_user_category ON public.email_analyses (user_id, category);
CREATE INDEX idx_email_analyses_user_urgency  ON public.email_analyses (user_id, urgency);

-- Trigger updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.email_analyses
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Row Level Security
ALTER TABLE public.email_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_own" ON public.email_analyses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "insert_own" ON public.email_analyses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "update_own" ON public.email_analyses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "delete_own" ON public.email_analyses
  FOR DELETE USING (auth.uid() = user_id);

-- Activer Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.email_analyses;

-- Rollback (exécuter si besoin de revenir en arrière) :
-- DROP TABLE IF EXISTS public.email_analyses;
-- ALTER PUBLICATION supabase_realtime DROP TABLE IF EXISTS public.email_analyses;
