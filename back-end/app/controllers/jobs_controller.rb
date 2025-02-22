# app/controllers/jobs_controller.rb
class JobsController < ApplicationController
  def sidekiq_stats
    stats = Sidekiq::Stats.new
    render json: {
      processed: stats.processed,
      failed: stats.failed,
      enqueued: stats.enqueued
    }
  end

  def trigger_birthday_job
    BirthdayWishesJob.perform_later
    render json: { message: "Birthday job triggered!" }
  end

  def trigger_birthday_job
    BirthdayWishesJob.perform_later
    Sidekiq::Stats.new.tap do |stats|
      ActionCable.server.broadcast("sidekiq_stats", {
        processed: stats.processed,
        failed: stats.failed,
        enqueued: stats.enqueued
      })
    end
    render json: { message: "Birthday job triggered!" }
  end
end
