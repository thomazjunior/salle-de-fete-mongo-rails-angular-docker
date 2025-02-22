class SidekiqStatsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "sidekiq_stats"
  end
end
