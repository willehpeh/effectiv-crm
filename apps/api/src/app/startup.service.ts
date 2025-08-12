import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ProjectionEventStream } from '@effectiv-crm/infrastructure';

@Injectable()
export class StartupService implements OnApplicationBootstrap {
  constructor(private readonly projectionEventStream: ProjectionEventStream) {}

  async onApplicationBootstrap() {
    // Add a small delay to ensure database connection is fully established
    setTimeout(() => {
      this.projectionEventStream.rebuildAll();
    }, 1000);
  }
}
