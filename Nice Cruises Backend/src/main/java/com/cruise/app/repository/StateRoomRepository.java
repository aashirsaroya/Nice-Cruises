package com.cruise.app.repository;

import com.cruise.app.model.StateRoom;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StateRoomRepository extends JpaRepository<StateRoom, Integer> {
  boolean existsByStateroomName(String stateroomName);
  @Query("SELECT sr FROM StateRoom sr WHERE sr.stateroomName = :stateroomName AND sr.side.name = :name")
  StateRoom findByStateroomNameAndSideName(@Param("stateroomName") String stateroomName, @Param("name") String name);
}
