# TODO

## RecordEmailSentToContactCommand Refactoring

The current implementation needs refactoring to follow proper DDD/Event Sourcing patterns:

1. **Load existing Contact aggregate** - The command handler should load the existing Contact from the event store instead of creating a new event directly
2. **Apply event through aggregate** - The Contact aggregate should have a `recordEmailSent()` method that applies the EmailSentToContact event
3. **Fix aggregate versioning** - The event should use the correct aggregate version (next version) instead of hardcoded value 1
4. **Update Contact.replayEvent()** - Add handling for EmailSentToContact event in the Contact aggregate's replayEvent method
5. **Update Contact state** - The Contact should track communication history (e.g., last contact date, communication count)

This follows the same pattern as `Contact.register()` but for existing aggregates rather than new ones.
